import { L_SYSTEM_DISTANCE } from "../../constants/constants";
import { getNthIterationLSystem } from "./lsystem";

export function* generatorPathLSystem(system, iterations) {
  const angle = system.angle;
  const distance = L_SYSTEM_DISTANCE;

  const word = getNthIterationLSystem(system.axiom, system.rules, iterations);

  let x = 0;
  let y = 0;
  let currAngleDeg = 90; // upwards first
  let currAngleRad = Math.PI / 2;

  const stack = [];

  yield [false, x, y];

  for (const symbol of word) {
    switch (symbol) {
      case "f":
      case "F":
        x += Math.cos(currAngleRad) * distance;
        y += Math.sin(currAngleRad) * distance;

        yield [symbol === "F", x, y];
        break;
      case "[":
        stack.push({ x, y, currAngleDeg });
        break;
      case "]":
        ({ x, y, currAngleDeg } = stack.pop());
        currAngleRad = (currAngleDeg * Math.PI) / 180;
        yield [false, x, y];
        break;
      case "+":
      case "-":
        currAngleDeg =
          (((symbol === "+" ? currAngleDeg + angle : currAngleDeg - angle) %
            360) +
            360) %
          360;
        currAngleRad = (currAngleDeg * Math.PI) / 180;
        break;
      default:
        break;
    }
  }
}

export function createPathLSystem(system, iterations) {
  if (!system) {
    return [];
  }

  const gen = generatorPathLSystem(system, iterations);

  return Array.from(gen);
}
