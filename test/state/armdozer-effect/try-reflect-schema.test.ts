import {
  TryReflect,
  TryReflectSchema,
} from "../../../src/state/armdozer-effect/try-reflect";

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
  expect(TryReflectSchema.parse(tryReflect)).toEqual(tryReflect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(tryReflect);
  const data = JSON.parse(str);
  expect(TryReflectSchema.parse(data)).toEqual(tryReflect);
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
  expect(() => TryReflectSchema.parse(data)).toThrow();
});
