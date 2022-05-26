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
  {
    id: 3,
    axiom: "FX".split(""),
    rules: [
      ["X", "X+YF+".split("")],
      ["Y", "-FX-Y".split("")],
    ],
    angle: 90.0,
    name: "Dragon Curve",
  },
  {
    id: 4,
    axiom: "X".split(""),
    rules: [
      ["X", "+YF-XFX-FY+".split("")],
      ["Y", "-XF+YFY+FX-".split("")],
    ],
    angle: 90.0,
    name: "Hilbert Curve",
  },
  {
    id: 5,
    axiom: "F".split(""),
    rules: [["F", "+F--F+".split("")]],
    angle: 45.0,
    name: "Levy C Curve",
  },
  {
    id: 6,
    axiom: "XF".split(""),
    rules: [
      ["X", "X+YF++YF-FX--FXFX-YF+".split("")],
      ["Y", "-FX+YFYF++YF+FX--FX-Y".split("")],
    ],
    angle: 60.0,
    name: "Gosper Curve",
  },
  {
    id: 7,
    axiom: "F+XF+F+XF".split(""),
    rules: [["X", "XF-F+F-XF+F+XF-F+F-X".split("")]],
    angle: 90.0,
    name: "Sierpinski Square",
  },
  {
    id: 8,
    axiom: "YF".split(""),
    rules: [
      ["X", "YF+XF+Y".split("")],
      ["Y", "XF-YF-X".split("")],
    ],
    angle: 60.0,
    name: "Sierpinski Arrowhead",
  },
  {
    id: 9,
    axiom: "F+F+F+F".split(""),
    rules: [["F", "FF+F+F+F+F+F-F".split("")]],
    angle: 90.0,
    name: "Shuriken",
  },
  {
    id: 10,
    axiom: "F+F+F+F".split(""),
    rules: [["F", "FF+F+F+F+FF".split("")]],
    angle: 90.0,
    name: "Board",
  },
];

export const ANIMATION_SPEEDS = [
  10, 20, 30, 50, 100, 150, 200, 300, 500, 1000, 2000, 5000, 10000,
];

export const L_SYSTEM_DISTANCE = 10;

export const MAX_PATH_LENGTH = 100000;
