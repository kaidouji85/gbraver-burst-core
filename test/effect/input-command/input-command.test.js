// @flow

import {inputCommand} from "../../../src/effect/input-command";
import type {GameState} from "../../../src/state/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";

test('戦闘後のコマンド入力フェイズが正しく適用される', () => {
  const player01 =  {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player01',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 5,
      maxBattery: 5,
      enableBurst: true,
    }
  };
  const player02 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player02',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 3,
      maxBattery: 5,
      enableBurst: false,
    }
  }
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player01, player02]
  };
  const player01Command = {type: 'BATTERY_COMMAND', battery: 3};
  const player02Command = {type: 'BATTERY_COMMAND', battery: 3};

  const result = inputCommand(lastState, player01.playerId, player01Command, player02.playerId, player02Command);
  expect(result).toEqual({
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: [
        {
          playerId: player01.playerId,
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
          playerId: player02.playerId,
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
            {type: 'PILOT_SKILL_COMMAND'},
          ]
        }
      ]
    }
  });
});

test('効果適用フロー後のコマンド入力フェイズ効果が正しく処理される', () => {
  const player01 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player01',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 5,
      enableBurst: true,
    }
  };
  const player02 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player02',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 3,
      maxBattery: 5,
      enableBurst: false
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player01, player02]
  };
  const player01Command = {type: 'BATTERY_COMMAND', battery: 3};
  const player02Command = {type: 'BURST_COMMAND'};

  const result = inputCommand(lastState, player01.playerId, player01Command, player02.playerId, player02Command);
  expect(result).toEqual({
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: [
        {
          playerId: 'player01',
          selectable: false,
          nextTurnCommand: {type: 'BATTERY_COMMAND', battery: 3}
        },
        {
          playerId: 'player02',
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
            {type: 'PILOT_SKILL_COMMAND'},
          ]
        }
      ]
    }
  });
});
