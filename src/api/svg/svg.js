export function pathToSVGCoords(path) {
  const isLine = path[0];
  const x = path[1];
  const y = path[2];

  return `${isLine ? "L" : "M"} ${x} ${y} `;
}

export function clearSVGPath(pathElement) {
  pathElement.setAttributeNS(null, "d", "");
}

export function addPathsToSVG(pathElement, paths) {
  let d = pathElement.getAttributeNS(null, "d");

  paths.forEach((path) => {
    d += pathToSVGCoords(path);
  });

  pathElement.setAttributeNS(null, "d", d);
}

export function scaleSVGToPaths(svgElement, path) {
  const minX = path.reduce((val, acc) => (val < acc[1] ? val : acc[1]), 0);
  const minY = path.reduce((val, acc) => (val < acc[2] ? val : acc[2]), 0);
  const maxX = path.reduce((val, acc) => (val > acc[1] ? val : acc[1]), 0);
  const maxY = path.reduce((val, acc) => (val > acc[2] ? val : acc[2]), 0);

  const width = maxX - minX;
  const height = maxY - minY;

  svgElement.setAttributeNS(
    null,
    "viewBox",
    `${minX} ${minY} ${width} ${height}`
  );
}

export function resetSVG(svgElement) {}

export function setSVGPaths(pathElement, paths) {
  let d = "";

  paths.forEach((path) => {
    d += pathToSVGCoords(path);
  });

  pathElement.setAttributeNS(null, "d", d);
}
