// @flow

import test from 'ava';
import {getRecoveredBattery} from "../../../../src/effect/turn-change/get-recovered-battery";

test('回復量だけバッテリーに追加される', t => {
  t.is(getRecoveredBattery(2, 5, 2), 4);
});

test('バッテリー最大値以上にはならない', t => {
  t.is(getRecoveredBattery(2, 5, 6), 5);
});