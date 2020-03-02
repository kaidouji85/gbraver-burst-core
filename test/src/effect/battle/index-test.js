// @flow

import test from 'ava';
import type {GameState} from "../../../../src/game-state/game-state";
import type {PlayerCommand} from "../../../../src/command/player-command";
import {battle} from "../../../../src/effect/battle";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('戦闘を実行した後の状態に正しく更新できる', t => {
  const attacker: PlayerState = {
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      battery: 5,
      maxBattery: 5,
    }
  };
  const defender: PlayerState = {
    playerId: 'defender',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 3000,
      maxHp: 3000,
      battery: 5,
      maxBattery: 5,
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: 'attacker',
  };
  const playerCommands: PlayerCommand[] = [
    {
      playerId: 'attacker',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 3
      }
    },
    {
      playerId: 'defender',
      command: {
        type: 'BATTERY_COMMAND',
        battery: 2
      }
    }
  ];

  const result = battle(lastState, playerCommands);
  t.deepEqual(result, {
    ...lastState,
    players: [
      {
        ...attacker,
        armdozer: {
          ...attacker.armdozer,
          battery: 2,
        }
      }, {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          hp: 1000,
          battery: 3
        },
      }
    ],
    effect: {
      name: 'Battle',
      attacker: 'attacker',
      isDeath: false,
      result: {
        name: 'NormalHit',
        damage: 2000
      }
    }
  });
});
