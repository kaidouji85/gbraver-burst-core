// @flow

import test from 'ava';
import {hasContinuousActive} from "../../../src/effect/continuous-active/has-continuous-active";
import type {CorrectPower} from "../../../src";

const continuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  period: {type: 'Permanent'},
};

const correctPower: CorrectPower = {
  type: 'CorrectPower',
  power: 1000,
  period: {type: 'TurnLimit',  remainingTurn: 1},
}

test('アクティブプレイヤー継続を含むことを正しく判定できる', t => {
  const effects = [continuousActivePlayer];
  t.true(hasContinuousActive(effects));
});

test('アクティブプレイヤー継続を含まないことを正しく判定できる', t => {
  const effects = [correctPower];
  t.false(hasContinuousActive(effects));
});

test('複数アームドーザ効果の中にアクティブプレイヤー継続が含まれていても正しく判定できる', t => {
  const effects = [correctPower, continuousActivePlayer, continuousActivePlayer, correctPower];
  t.true(hasContinuousActive(effects));
});

test('アームドーザ効果が空の場合、アクティブプレイヤー継続は含まれていないと判定する', t => {
  const effects = [];
  t.false(hasContinuousActive(effects));
});