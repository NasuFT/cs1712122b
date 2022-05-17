export function systemReducer(state, action) {
  switch (action.type) {
    case "updateAxiom":
      return {
        ...state,
        axiom: action.payload,
      };
    case "updateRules":
      return {
        ...state,
        rules: action.payload,
      };
    case "updateAngle":
      return {
        ...state,
        angle: action.payload,
      };
    case "updateName":
      return {
        ...state,
        name: action.payload,
      };
    case "clear":
      return {
        axiom: [],
        rules: {},
        angle: 90.0,
        name: "",
      };
    case "set":
      return action.payload;
    default:
      return state;
  }
}
