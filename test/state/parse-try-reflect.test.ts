import {parseTryReflect, TryReflect} from "../../src";

/** 有効なTryReflect */
const tryReflect: TryReflect = {
  type: "TryReflect",
  effect: "Lightning",
  damage: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 2,
  }
};

test("TryReflectはパースできる", () => {
  expect(parseTryReflect(tryReflect)).toEqual(tryReflect);
});

test("TryReflectではないオブジェクトはパースできない", () => {
  const invalid = {...tryReflect, type: "InvalidType"};
  expect(parseTryReflect(invalid)).toBeNull();
});