import { parseTryReflect, TryReflect } from "../../../src";

/** 有効なTryReflect */
const tryReflect: TryReflect = {
  type: "TryReflect",
  effect: "Lightning",
  damage: 2000,
  period: {
    type: "TurnLimit",
    remainingTurn: 2,
  },
};

test("TryReflectはパースできる", () => {
  expect(parseTryReflect(tryReflect)).toEqual(tryReflect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(tryReflect);
  const data = JSON.parse(str);
  expect(parseTryReflect(data)).toEqual(tryReflect);
});

test("TryReflectではないオブジェクトはパースできない", () => {
  const data = {
    type: "TryReflect",
    effectLabel: "Lightning",
    reflectDamage: 1000,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  };
  expect(parseTryReflect(data)).toBeNull();
});
