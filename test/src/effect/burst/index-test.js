// @flow

import test from 'ava';
import * as R from 'ramda';
import type {GameState} from "../../../../src/game-state/game-state";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {burst} from "../../../../src/effect/burst";

test('バースト効果適用処理が正しく実行されている', t => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
  };
  const player2: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 0,
      maxBattery: 5,
      enableBurst: true,
      burst: {
        type: 'RecoverBattery',
        recoverBattery: 5
      }
    }
  };

  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2],
  };

  const result = burst(lastState, 'player2');
  t.deepEqual(
    R.pick(['name', 'burstPlayer'], result.effect),
    {name: 'BurstEffect', burstPlayer: 'player2'},
    "player2がバーストを発動している"
  );
});
