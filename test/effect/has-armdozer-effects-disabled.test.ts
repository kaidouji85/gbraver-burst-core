import { ArmdozerEffectsDisabled, CorrectPower } from "../../src";
import { hasArmdozerEffectsDisabled } from "../../src/effect/has-armdozer-effects-disabled";

/** アームドーザ効果無効 */
const armdozerEffectDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/**攻撃補正 */
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

test("アームドーザ効果無効をもつ場合はtrueを返す", () => {
  expect(
    hasArmdozerEffectsDisabled([armdozerEffectDisabled, correctPower]),
  ).toBe(true);
});

test("アームドーザ効果無効がない場合はfalseを返す", () => {
  expect(hasArmdozerEffectsDisabled([correctPower])).toBe(false);
});

test("何も効果を得ていない場合はfalseを返す", () => {
  expect(hasArmdozerEffectsDisabled([])).toBe(false);
});
