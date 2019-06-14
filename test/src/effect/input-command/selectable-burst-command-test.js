// @flow
import test from 'ava';
import {selectableBurstCommand} from "../../../../src/effect/input-command/selectable-burst-command";

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
  t.deepEqual(selectableBurstCommand(ARMDOZER_STATE), [
    {type: 'BURST_COMMAND'}
  ]);
});

test('バーストフラグがOFFならバーストが使える', t => {
  t.deepEqual(selectableBurstCommand({...ARMDOZER_STATE, enableBurst: false}), []);
});
