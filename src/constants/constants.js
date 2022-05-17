export const L_SYSTEMS = [
  {
    id: 0,
    axiom: "X".split(""),
    rules: [
      ["X", "F[+X][-X]FX".split("")],
      ["F", "FF".split("")],
    ],
    angle: 25.7,
    name: "Symmetric Tree",
  },
  {
    id: 1,
    axiom: "X".split(""),
    rules: [
      ["X", "F-[[X]+X]+F[+FX]-X".split("")],
      ["F", "FF".split("")],
    ],
    angle: 22.5,
    name: "Tilted Tree",
  },
  {
    id: 2,
    axiom: "F-F-F-F".split(""),
    rules: [["F", "F-F+F+FF-F-F+F".split("")]],
    angle: 90.0,
    name: "Koch Island",
  },
];

export const ANIMATION_SPEEDS = [
  10, 20, 30, 50, 100, 150, 200, 300, 500, 1000, 2000, 5000, 10000,
];

export const L_SYSTEM_DISTANCE = 10;

export const MAX_PATH_LENGTH = 100000;
