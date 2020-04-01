// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import {EMPTY_ARMDOZER_EFFECT} from "../../../data/amrdozer-effect";
import {updateRemainingTurn} from "../../../../src/effect/update-remaning-turn";

test('効果継続ターン更新が正しく処理される', t => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 1},
        {...EMPTY_ARMDOZER_EFFECT, remainingTurn: Infinity},
        {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 4},
      ]
    }
  };
  const player2 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 1},
        {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 3}
      ]
    }
  };
  const data = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2]
  };

  const result = updateRemainingTurn(data);
  const expected = {
    ...data,
    players: [
      {
        ...player1,
        armdozer: {
          ...player1.armdozer,
          effects: [
            {...EMPTY_ARMDOZER_EFFECT, remainingTurn: Infinity},
            {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 3},
          ]
        }
      },
      {
        ...player2,
        armdozer: {
          ...player2.armdozer,
          effects: [
            {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 2}
          ]
        }
      }
    ],
    effect: {
      name: 'UpdateRemainingTurn',
      endArmdozerEffects: [
        {
          playerId: player1.playerId,
          effect: {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 0}
        },
        {
          playerId: player2.playerId,
          effect: {...EMPTY_ARMDOZER_EFFECT, remainingTurn: 0}
        }
      ]
    }
  };
  t.deepEqual(result, expected);
});