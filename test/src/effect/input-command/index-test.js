// @flow

import test from 'ava';
import {inputCommand, inputCommandAfterBurst} from "../../../../src/effect/input-command";
import type {GameState} from "../../../../src/state/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {PlayerCommand} from "../../../../src/player/command/player-command";

test('コマンド入力フェイズの効果が正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_ARMDOZER_STATE,
    players: [
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player01',
        armdozer: {
          ...EMPTY_ARMDOZER_STATE,
          battery: 5,
          maxBattery: 5,
          enableBurst: true,
        }
      },
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player02',
        armdozer: {
          ...EMPTY_ARMDOZER_STATE,
          battery: 3,
          maxBattery: 5,
          enableBurst: false
        }
      }
    ]
  };

  const result = inputCommand(lastState);
  t.deepEqual(result, {
    ...lastState,
    effect: {
      name: 'InputCommand',
      players: [
        {
          playerId: 'player01',
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
            {type: 'BATTERY_COMMAND', battery: 4},
            {type: 'BATTERY_COMMAND', battery: 5},
            {type: 'BURST_COMMAND'}
          ]
        },
        {
          playerId: 'player02',
          selectable: true,
          command: [
            {type: 'BATTERY_COMMAND', battery: 0},
            {type: 'BATTERY_COMMAND', battery: 1},
            {type: 'BATTERY_COMMAND', battery: 2},
            {type: 'BATTERY_COMMAND', battery: 3},
          ]
        }
      ]
    }
  });
});

test('バースト後のコマンド入力フェイズ効果が正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_ARMDOZER_STATE,
    players: [
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player01',
        armdozer: {
          ...EMPTY_ARMDOZER_STATE,
          battery: 2,
          maxBattery: 5,
          enableBurst: true,
        }
      },
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player02',
        armdozer: {
          ...EMPTY_ARMDOZER_STATE,
          battery: 3,
          maxBattery: 5,
          enableBurst: false
        }
      }
    ]
  };
  const commands: PlayerCommand[] = [
    {
      playerId: 'player01',
      command: {type: 'BATTERY_COMMAND', battery: 3}
    },
    {
      playerId: 'player02',
      command: {type: 'BURST_COMMAND'}
    }
  ];

  const result = inputCommandAfterBurst(lastState, commands);
  t.deepEqual(result, {
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
          ]
        }
      ]
    }
  });
});
