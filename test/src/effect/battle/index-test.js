// @flow

import test from 'ava';
import type {GameState} from "../../../../src/game/state/game-state";
import {battle} from "../../../../src/effect/battle";
import type {PlayerState} from "../../../../src/game/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import type {BatteryCommand, PlayerCommandX} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";

test('戦闘を実行した後の状態に正しく更新できる', t => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'attacker',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      battery: 5,
      maxBattery: 5,
    }
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
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
    players: [defender, attacker],
    activePlayerId: 'attacker',
  };
  const attackerBattery: PlayerCommandX<BatteryCommand> = {
    playerId: 'attacker',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 3
    }
  };
  const defenderBattery: PlayerCommandX<BatteryCommand> = {
    playerId: 'defender',
    command: {
      type: 'BATTERY_COMMAND',
      battery: 2
    }
  };

  const result = battle(lastState, attackerBattery, defenderBattery);
  const expected = {
    ...lastState,
    players: [
      {
        ...defender,
        armdozer: {
          ...defender.armdozer,
          hp: 1000,
        },
      },
      attacker,
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
  };
  t.deepEqual(result, expected);
});
