// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {extractBatteryCommands} from "../../../../src/game/progress/extract-battery-commands";

const ATTACKER = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'attacker'
};

const DEFENDER = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'defender'
};

const STATE = {
  ...EMPTY_GAME_STATE,
  players: [ATTACKER, DEFENDER],
  activePlayerId: ATTACKER.playerId
};

test('防御側、攻撃側のバッテリーコマンドを正しく抽出できる', t => {
  const attackerBattery = {
    type: 'BATTERY_COMMAND',
    battery: 3,
  };
  const defenderBattery = {
    type: 'BATTERY_COMMAND',
    battery: 2,
  };
  const commands = [
    {playerId: ATTACKER.playerId, command: attackerBattery},
    {playerId: DEFENDER.playerId, command: defenderBattery},
  ];

  const result = extractBatteryCommands(STATE, commands);
  const expected = {
    attacker: {playerId: ATTACKER.playerId, command: attackerBattery},
    defender: {playerId: DEFENDER.playerId, command: defenderBattery},
  };
  t.deepEqual(result, expected);
});

test('プレイヤーコマンドに存在しないユーザを指定するとnullを返す', t => {
  const attackerBattery = {
    type: 'BATTERY_COMMAND',
    battery: 3,
  };
  const defenderBattery = {
    type: 'BATTERY_COMMAND',
    battery: 2,
  };
  const commands = [
    {playerId: 'no-exit-user', command: attackerBattery},
    {playerId: DEFENDER.playerId, command: defenderBattery},
  ];

  const result = extractBatteryCommands(STATE, commands);
  t.is(result, null);
});

test('バッテリーコマンド以外が含まれるとnullを返す', t => {
  const attackerBattery = {
    type: 'BURST_COMMAND'
  };
  const defenderBattery = {
    type: 'BATTERY_COMMAND',
    battery: 2,
  };
  const commands = [
    {playerId: ATTACKER.playerId, command: attackerBattery},
    {playerId: DEFENDER.playerId, command: defenderBattery},
  ];

  const result = extractBatteryCommands(STATE, commands);
  t.is(result, null);
});