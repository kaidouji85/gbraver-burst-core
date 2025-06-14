import { damageReduction } from "../../src/effect/damage-reduction";
import { ArmdozerEffectsDisabled } from "../../src/state/armdozer-effect/armdozer-effects-disabled";
import { DamageHalved } from "../../src/state/armdozer-effect/damage-halved";

/** ダメージ半減効果 */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/** アームドーザ効果無効 */
const armdozerEffectsDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

test("アームドーザ効果がない場合、ダメージ減少率は1である", () => {
  expect(damageReduction([])).toBe(1);
});

test("ダメージ半減効果を持つ場合、減少率は0.5である", () => {
  expect(damageReduction([damageHalved])).toBe(0.5);
});

test("アームドーザ効果無効がある場合、他のいかなる効果も無視して減少率は1とみなす", () => {
  expect(damageReduction([damageHalved, armdozerEffectsDisabled])).toBe(1);
});

test("アームドーザ効果無効だけの場合、減少率は1となる", () => {
  expect(damageReduction([armdozerEffectsDisabled])).toBe(1);
});
