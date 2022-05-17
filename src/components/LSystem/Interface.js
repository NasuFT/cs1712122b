import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { createPathLSystem } from "../../api/lsystem/path";
import {
  addPathsToSVG,
  clearSVGPath,
  scaleSVGToPaths,
  setSVGPaths,
} from "../../api/svg/svg";

function Interface({
  system,
  isAnimate,
  iterations,
  animationSpeed,
  toReset,

  setToReset,
}) {
  const animationIntervalID = useRef(null);

  const deferredIterations = useDeferredValue(iterations);
  const deferredSystem = useDeferredValue(system);

  const svgElement = useRef();
  const pathElement = useRef();

  const paths = useMemo(
    () => createPathLSystem(deferredSystem, deferredIterations),
    [deferredSystem, deferredIterations]
  );

  // Automatically transform coord system of SVG
  useLayoutEffect(() => {
    svgElement.current.setAttributeNS(null, "transform", `scale(1, -1)`);
  }, []);

  // Animation function
  const animate = useCallback(() => {
    console.log("animation start");

    clearSVGPath(pathElement.current);
    scaleSVGToPaths(svgElement.current, paths);

    function* generatorPath() {
      for (const path of paths) {
        yield path;
      }
    }

    const gen = generatorPath();

    const animationTickTime = animationSpeed < 50 ? 1000 / animationSpeed : 20;
    const animationTickPaths =
      animationSpeed < 50 ? 1 : Math.round((20 * animationSpeed) / 1000);

    console.log("tick time: ", animationTickTime);
    console.log("tick lines: ", animationTickPaths);

    clearInterval(animationIntervalID.current);
    console.log("cleared animation interval ID: ", animationIntervalID.current);

    function onTick() {
      console.log("interval start");
      let { value, done } = gen.next();
      let i = 1;
      const values = [];

      while (i < animationTickPaths && !done) {
        values.push(value);
        ({ value, done } = gen.next());
        i += 1;
      }

      if (value) {
        values.push(value);
      }

      console.log(values);

      addPathsToSVG(pathElement.current, values);

      if (done) {
        clearInterval(animationIntervalID.current);
        console.log("done");
      }
    }

    console.log("starting interval");
    animationIntervalID.current = setInterval(onTick, animationTickTime);

    console.log("set animation interval ID: ", animationIntervalID.current);
  }, [toReset, animationSpeed, paths]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Instant Draw function
  const draw = useCallback(() => {
    clearSVGPath(pathElement.current);
    scaleSVGToPaths(svgElement.current, paths);
    setSVGPaths(pathElement.current, paths);
  }, [paths]);

  // reset animation
  useEffect(() => {
    if (!toReset) {
      return;
    }

    setToReset(false);
    animate();
    return () => clearInterval(animationIntervalID.current);
  }, [toReset, animate, setToReset]);

  // main effectful function
  useEffect(() => {
    if (!system) {
      return;
    }

    if (!isAnimate) {
      console.log(system);
      draw();
      return;
    }

    animate();
    return () => clearInterval(animationIntervalID.current);
  }, [isAnimate, system, animate, draw]);

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="800"
      ref={svgElement}
    >
      <path ref={pathElement} fill="transparent" stroke="black"></path>
    </svg>
  );
}

export default Interface;
