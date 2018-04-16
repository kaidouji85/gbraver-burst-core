// @flow
import test from 'ava';
import {getEnableBurstCommand} from "../../../src/effect/input-command/enable-burst-command";
import type {Command} from "../../../src/command/command";

const ARMDOZER_STATE = {
  id: 'test',
  name: 'name',
  maxHp: 3000,
  hp: 3000,
  maxBattery: 5,
  battery: 5,
  power: 2000,
  speed: 2000,
  enableBurst: true
};

test('バーストフラグがONならバーストが使える', t => {
  const result: Command[] = getEnableBurstCommand({...ARMDOZER_STATE});
  t.is(result.filter(v => v.type === 'BURST_COMMAND').length, 1);
});

test('バーストフラグがOFFならバーストが使える', t => {
  const result: Command[] = getEnableBurstCommand({...ARMDOZER_STATE, enableBurst: false});
  t.is(result.filter(v => v.type === 'BURST_COMMAND').length, 0);
});