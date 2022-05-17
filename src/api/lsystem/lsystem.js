import { MAX_PATH_LENGTH } from "../../constants/constants";

export function getNthIterationLSystem(axiom, rules, steps = 1) {
  let word = axiom.slice();

  while (steps > 0) {
    word = word.flatMap((symbol) => {
      const newSuccessor = rules.find((rule) => rule[0] === symbol);

      if (!newSuccessor) {
        return [symbol];
      }

      return newSuccessor[1];
    });
    steps -= 1;
  }

  return word;
}

export function calculateMaxIterations(system) {
  if (system.axiom.length === 0 || Object.keys(system.rules).length === 0) {
    return 10;
  }

  const word1 = getNthIterationLSystem(system.axiom, system.rules, 3);
  const word2 = getNthIterationLSystem(system.axiom, system.rules, 4);

  const axiomLength = system.axiom.length;
  const multiplier = word2.length / word1.length;

  if (multiplier === 1) {
    return 10;
  }

  let estimatedLength = axiomLength;
  let iterations = 0;

  while (estimatedLength * multiplier <= MAX_PATH_LENGTH) {
    iterations += 1;
    estimatedLength *= multiplier;
  }

  return iterations;
}
