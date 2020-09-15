// @flow

import test from 'ava';
import type {PlayerState} from "../../../../../src/state/player-state";
import type {BatteryCommand} from "../../../../../src/command/battery";
import {battleResult} from "../../../../../src/effect/battle/result/battle-result";
import {EMPTY_PLAYER_STATE} from "../../../../data/player";

const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'player1',
};

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'player2',
};

test('防御バッテリー < 攻撃バッテリー なら攻撃ヒット', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 2};
  const result = battleResult(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.name, 'NormalHit');
});

test('防御バッテリー = 攻撃バッテリー なら防御', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const result = battleResult(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.name, 'Guard');
});

test('攻撃バッテリー < 防御バッテリー  ならミス', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 1};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 3};
  const result = battleResult(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.name, 'Miss');
});

test('攻撃バッテリーが1以上 and 防御バッテリーが0 ならクリティカルヒット', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 4};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const result = battleResult(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.name, 'CriticalHit');
});

test('攻撃バッテリーが0ならフェイント', t => {
  const attackerBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const defenderBattery: BatteryCommand = {type: 'BATTERY_COMMAND', battery: 0};
  const result = battleResult(ATTACKER, attackerBattery, DEFENDER, defenderBattery);
  t.is(result.name, 'Feint');
});
