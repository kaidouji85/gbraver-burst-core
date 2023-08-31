import { DamageHalved, DamageHalvedSchema } from "../../../src";

/** 有効なDamageHalved */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("DamageHalvedはパースできる", () => {
  expect(DamageHalvedSchema.parse(damageHalved)).toEqual(damageHalved);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(damageHalved);
  const data = JSON.parse(str);
  expect(DamageHalvedSchema.parse(data)).toEqual(damageHalved);
});

test("DamageHalved以外はパースできない", () => {
  const data = {
    type: "Halved",
    period: {
      type: "TurnLimit",
      remaining: 1,
    },
  };
  expect(() => DamageHalvedSchema.parse(data)).toThrow();
});
