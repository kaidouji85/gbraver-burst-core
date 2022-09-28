// @flow
import { hasDamageHalved } from "../../src/effect/damage-halved";

const oneTurn = {type: 'TurnLimit', remainingTurn: 1};
const damageHalved = {type: 'DamageHalved', period: oneTurn};
const correctPower = {type: 'CorrectPower', power: 1000, period: oneTurn};

test('ダメージ半減効果を持つことを正しく判定できる', () => {
  const effects = [damageHalved, correctPower];
  expect(hasDamageHalved(effects)).toBe(true);
});

test('ダメージ半減効果を持たないことを正しく判定できる', () => {
  const effects = [correctPower, correctPower];
  expect(hasDamageHalved(effects)).toBe(false);
});

test('何の効果も持たない場合、ダメージ半減効果なしと判断する', () => {
  const effects = [];
  expect(hasDamageHalved(effects)).toBe(false);
});