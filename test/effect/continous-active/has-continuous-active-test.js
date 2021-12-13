// @flow

import test from 'ava';
import {hasContinuousActive} from "../../../src/effect/continuous-active/has-continuous-active";
import {EMPTY_ARMDOZER_EFFECT} from "../../../src";

const continuousActivePlayer = {
  type: 'ContinuousActivePlayer',
  period: {type: 'Permanent'},
};

test('アクティブプレイヤー継続を含むことを正しく判定できる', t => {
  const effects = [continuousActivePlayer];
  t.true(hasContinuousActive(effects));
});

test('アクティブプレイヤー継続を含まないことを正しく判定できる', t => {
  const effects = [EMPTY_ARMDOZER_EFFECT];
  t.false(hasContinuousActive(effects));
});

test('複数アームドーザ効果の中にアクティブプレイヤー継続が含まれていても正しく判定できる', t => {
  const effects = [EMPTY_ARMDOZER_EFFECT, continuousActivePlayer, continuousActivePlayer, EMPTY_ARMDOZER_EFFECT];
  t.true(hasContinuousActive(effects));
});

test('アームドーザ効果が空の場合、アクティブプレイヤー継続は含まれていないと判定する', t => {
  const effects = [];
  t.false(hasContinuousActive(effects));
});