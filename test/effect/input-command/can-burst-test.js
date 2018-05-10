// @flow
import test from 'ava';
import {canBurst} from "../../../src/effect/input-command/enable-burst-command";

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
  t.true(canBurst(ARMDOZER_STATE));
});

test('バーストフラグがOFFならバーストが使える', t => {
  t.false(canBurst({...ARMDOZER_STATE, enableBurst: false}));
});