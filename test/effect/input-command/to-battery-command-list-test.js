// @flow

import test from 'ava';
import {toBatteryCommandList} from "../../../src/effect/input-command/enable-battery-command";

test('数字配列をそのままバッテリーコマンドリストに変換する', t => {
  t.deepEqual(
    toBatteryCommandList([0,1,2,3,4,5]),
    [
      {type: 'BATTERY_COMMAND', battery: 0},
      {type: 'BATTERY_COMMAND', battery: 1},
      {type: 'BATTERY_COMMAND', battery: 2},
      {type: 'BATTERY_COMMAND', battery: 3},
      {type: 'BATTERY_COMMAND', battery: 4},
      {type: 'BATTERY_COMMAND', battery: 5},
    ]
  );
});

test('入力がから配列なら、出力もから配列である', t => {
  t.deepEqual(toBatteryCommandList([]),[]);
});
