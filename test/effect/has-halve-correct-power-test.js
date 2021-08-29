// @flow

import test from 'ava';
import {hasHalveCorrectPower} from "../../src";

const halveCorrectPower = {type: 'HalveCorrectPower', remainingTurn: 1};
const correctPower = {type: 'CorrectPower', power: 1000, remainingTurn: 1};

test('攻撃補正半減効果を持つことを正しく判定できる', t => {
  const effects = [halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  t.true(result);
});

test('攻撃補正半減効果を複数持つ場合でも、正しく判定できる', t => {
  const effects = [halveCorrectPower, halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  t.true(result);
});

test('アームドーザ効果が空の場合、攻撃補正半減効果を持たないと判定する', t => {
  const effects = [];
  const result = hasHalveCorrectPower(effects);
  t.false(result);
});

test('攻撃補正半減とそれ以外の効果が含まれる場合、半減効果を持つと判定する', t => {
  const effects = [correctPower, halveCorrectPower];
  const result = hasHalveCorrectPower(effects);
  t.true(result);
});

test('攻撃補正以外の効果を複数持つ場合、半減効果は持たないと判定する', t => {
  const effects = [correctPower, correctPower];
  const result = hasHalveCorrectPower(effects);
  t.false(result);
});