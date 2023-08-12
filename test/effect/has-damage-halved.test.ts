import { hasDamageHalved } from "../../src/effect/damage-halved";
import {
  ArmdozerEffect,


} from "../../src/state/armdozer-effect/armdozer-effect";
import {TurnLimitEffect} from "../../src/state/armdozer-effect/turn-limit-effect";
import {CorrectPower} from "../../src/state/armdozer-effect/correct-power";
import {DamageHalved} from "../../src/state/armdozer-effect/damage-halved";

const oneTurn: TurnLimitEffect = {
  type: "TurnLimit",
  remainingTurn: 1,
};
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: oneTurn,
};
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: oneTurn,
};

test("ダメージ半減効果を持つことを正しく判定できる", () => {
  const effects = [damageHalved, correctPower];
  expect(hasDamageHalved(effects)).toBe(true);
});

test("ダメージ半減効果を持たないことを正しく判定できる", () => {
  const effects = [correctPower, correctPower];
  expect(hasDamageHalved(effects)).toBe(false);
});

test("何の効果も持たない場合、ダメージ半減効果なしと判断する", () => {
  const effects: ArmdozerEffect[] = [];
  expect(hasDamageHalved(effects)).toBe(false);
});
