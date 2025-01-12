import { DamageHalved } from "../../src";
import { damageReduction } from "../../src/effect/damage-reduction";

/** ダメージ半減効果 */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

test("アームドーザ効果がない場合、ダメージ減少率は1である", () => {
  expect(damageReduction([])).toBe(1);
});

test("ダメージ半減効果を持つ場合、減少率は0.5である", () => {
  expect(damageReduction([damageHalved])).toBe(0.5);
});
