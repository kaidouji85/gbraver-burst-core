// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {gameStartInputCommand} from "../../../../src/effect/input-command";

const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'attacker',
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    battery: 5,
    maxBattery: 5,
    enableBurst: true
  },
  pilot: {
    ...EMPTY_PLAYER_STATE.pilot,
    enableSkill: true
  }
};

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'defender',
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    battery: 5,
    maxBattery: 5,
    enableBurst: true
  },
  pilot: {
    ...EMPTY_PLAYER_STATE.pilot,
    enableSkill: true
  }
};

test('ゲームスタート時 コマンド入力フェイズが正しく適用される', t => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [ATTACKER, DEFENDER],
    activePlayerId: ATTACKER.playerId,
  };
  const result = gameStartInputCommand(state);
  const expected = {
    ...state,
    effect: {
      name: 'InputCommand',
      players: [
        {
          playerId: ATTACKER.playerId,
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
            {type: 'BATTERY_COMMAND', battery: 4},
            {type: 'BATTERY_COMMAND', battery: 5},
            {type: 'BURST_COMMAND'},
            {type: 'PILOT_SKILL_COMMAND'}
          ]
        },
        {
          playerId: DEFENDER.playerId,
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
            {type: 'BATTERY_COMMAND', battery: 4},
            {type: 'BATTERY_COMMAND', battery: 5},
            {type: 'BURST_COMMAND'},
            {type: 'PILOT_SKILL_COMMAND'}
          ]
        }
      ]
    }
  };
  t.deepEqual(result, expected);
});