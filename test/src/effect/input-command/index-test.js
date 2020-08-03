// @flow

import test from 'ava';
import {gameStartInputCommand, inputCommand} from "../../../../src/effect/input-command";
import type {GameState} from "../../../../src/game/state/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import type {PlayerCommand} from "../../../../src";

test('ゲームスタート時 コマンド入力フェイズが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player01',
        armdozer: {
          ...EMPTY_PLAYER_STATE.armdozer,
          battery: 5,
          maxBattery: 5,
          enableBurst: true,
        },
        pilot: {
          ...EMPTY_PLAYER_STATE.pilot,
          enableSkill: true
        }
      },
      {
        ...EMPTY_PLAYER_STATE,
        playerId: 'player02',
        armdozer: {
          ...EMPTY_PLAYER_STATE.armdozer,
          battery: 5,
          maxBattery: 5,
          enableBurst: true,
        },
        pilot: {
          ...EMPTY_PLAYER_STATE.pilot,
          enableSkill: true
        }
      }
    ]
  };

  const result = gameStartInputCommand(lastState);
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
            {type: 'BURST_COMMAND'},
            {type: 'PILOT_SKILL_COMMAND'}
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
            {type: 'BATTERY_COMMAND', battery: 4},
            {type: 'BATTERY_COMMAND', battery: 5},
            {type: 'BURST_COMMAND'},
            {type: 'PILOT_SKILL_COMMAND'}
          ]
        }
      ]
    }
  });
});

test('戦闘後のコマンド入力フェイズが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
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
          enableBurst: false,
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
      command: {type: 'BATTERY_COMMAND', battery: 3}
    }
  ];


  const result = inputCommand(lastState, commands);
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
            {type: 'BURST_COMMAND'},
            {type: 'PILOT_SKILL_COMMAND'}
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
            {type: 'PILOT_SKILL_COMMAND'},
          ]
        }
      ]
    }
  });
});

test('バースト後のコマンド入力フェイズ効果が正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
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

  const result = inputCommand(lastState, commands);
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
            {type: 'PILOT_SKILL_COMMAND'},
          ]
        }
      ]
    }
  });
});
