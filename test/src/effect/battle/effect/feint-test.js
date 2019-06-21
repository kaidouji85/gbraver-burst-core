// @flow

import test from 'ava';
import type {BatteryCommand} from "../../../../../src/command/battery";
import {feint} from "../../../../../src/effect/battle/effect/feint";

test('フェイントで防御側がバッテリーを使った場合、防御側が動いたとみなす', t => {
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = feint(defenderBattery);
  t.true(result.isDefenderMoved);
});

test('フェイントで防御側がバッテリーを使った場合、防御側が動いていないとみなす', t => {
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const result = feint(defenderBattery);
  t.false(result.isDefenderMoved);
});