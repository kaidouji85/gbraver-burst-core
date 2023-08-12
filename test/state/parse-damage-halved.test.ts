import {DamageHalved, parseDamageHalved} from "../../src";

/** 有効なDamageHalved */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  }
};

test("DamageHalvedはパースできる", () => {
  expect(parseDamageHalved(damageHalved)).toEqual(damageHalved);
});

test("DamageHalved以外はパースできない", () => {
  const data = {
    type: "Halved",
    period: {
      type: "TurnLimit",
      remaining: 1,
    }
  };
  expect(parseDamageHalved(data)).toBeNull();
});
