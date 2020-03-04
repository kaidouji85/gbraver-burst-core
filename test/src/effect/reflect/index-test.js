// @flow

import test from 'ava';
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import type {PlayerState} from "../../../../src/state/player-state";
import {reflect} from "../../../../src/effect/reflect";
import {EMPTY_GAME_STATE} from "../../../data/game-state";

test('ダメージ反射を正しく適用できる', t => {
  const damagedPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'damagedPlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      hp: 3000,
      maxHp: 3000,
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer',
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    players: [damagedPlayer, otherPlayer]
  };

  const result = reflect(lastState, damagedPlayer.playerId, 2000, 'Lightning');
  const expected = {
    ...lastState,
    players: [
      {
        ...damagedPlayer,
        armdozer: {
          ...damagedPlayer.armdozer,
          hp: 1000
        }
      },
      otherPlayer,
    ],
    effect: {
      name: 'Reflect',
      damage: 2000,
      effect: 'Lightning',
      isDeath: false,
    }
  };
  t.deepEqual(result, expected);
});