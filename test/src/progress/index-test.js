// @flow

import test from 'ava';
import type {Player} from "../../../src/player/player";
import {EMPTY_ARMDOZER} from "../../data/armdozer";
import type {GameState} from "../../../src/game-state/game-state";
import {EMPTY_GAME_STATE} from "../../data/game-state";
import {progress} from "../../../src/progress";
import type {PlayerCommand} from "../../../src/command/player-command";

const attacker: Player = {
  playerId: 'attacker',
  armdozer: {
    ...EMPTY_ARMDOZER,
    battery: 2,
    maxBattery: 5,
    enableBurst: true,
    burst: {
      type: 'RecoverBattery',
      recoverBattery: 5
    }
  }
};

const afterBurstAttacker: Player = {
  ...attacker,
  armdozer: {
    ...attacker.armdozer,
    battery: 5,
    enableBurst: false
  }
};

const defender: Player = {
  playerId: 'defender',
  armdozer: {
    ...EMPTY_ARMDOZER,
    battery: 3,
    maxBattery: 5,
    enableBurst: true,
  },
  burst: {
    type: 'RecoverBattery',
    recoverBattery: 5
  }
};

test('攻撃側:バースト、防御側:バッテリー のケースが正しく適用される', t => {
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: 'attacker',
  };
  const commands: PlayerCommand[] = [{
    playerId: 'attacker',
    command: {type: 'BURST_COMMAND'}
  }, {
    playerId: 'defender',
    command: {type: 'BATTERY_COMMAND', battery: 2}
  }];

  const result = progress(lastState, commands);
  t.deepEqual(result, [
    {
      activePlayerId: 'attacker',
      players: [afterBurstAttacker, defender],
      effect: {
        name: 'BurstEffect',
        burstPlayer: 'attacker',
        burst: {
          type: 'RecoverBattery',
          recoverBattery: 5,
        }
      }
    },
    {
      activePlayerId: 'attacker',
      players: [afterBurstAttacker, defender],
      effect: {
        name: 'InputCommand',
        players: [
          {
            playerId: 'attacker',
            command: [
              {type: 'BATTERY_COMMAND', battery: 0},
              {type: 'BATTERY_COMMAND', battery: 1},
              {type: 'BATTERY_COMMAND', battery: 2},
              {type: 'BATTERY_COMMAND', battery: 3},
              {type: 'BATTERY_COMMAND', battery: 4},
              {type: 'BATTERY_COMMAND', battery: 5},
            ]
          },
          {
            playerId: 'defender',
            command: [
              {type: 'BATTERY_COMMAND', battery: 2},
            ]
          }
        ]
      }
    }
  ]);
});
