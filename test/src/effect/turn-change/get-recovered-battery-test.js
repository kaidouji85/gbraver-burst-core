// @flow

import test from 'ava';
import {turnChangeRecoverBattery} from "../../../../src/effect/turn-change/recover-battery";

test('回復量だけバッテリーに追加される', t => {
  t.is(turnChangeRecoverBattery(2, 5, 2), 4);
});

test('バッテリー最大値以上にはならない', t => {
  t.is(turnChangeRecoverBattery(2, 5, 6), 5);
});