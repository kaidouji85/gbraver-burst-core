// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../../src";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {skipTurn} from "../../../../src/effect/burst/skip-turn";
import type {SkipTurn} from "../../../../src/player/armdozer/burst";

test('スキップターンが正しく処理できる', t => {
  const burstPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'burstPlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      battery: 1,
      maxBattery: 5
    }
  };
  const otherPlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer'
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: otherPlayer.playerId,
    players: [otherPlayer, burstPlayer]
  };
  const burst: SkipTurn = {
    type: 'SkipTurn',
    recoverBattery: 3,
  };

  const result = skipTurn(lastState, burstPlayer.playerId, burst);
  const expected = {
    ...lastState,
    activePlayerId: burstPlayer.playerId,
    players: [
      otherPlayer,
      {
        ...burstPlayer,
        armdozer: {
          ...burstPlayer.armdozer,
          battery: 4
        }
      }
    ],
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: burst
    }
  };
  t.deepEqual(result, expected);
});