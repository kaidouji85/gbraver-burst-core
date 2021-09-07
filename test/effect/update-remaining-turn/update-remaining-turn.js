// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_ARMDOZER_EFFECT} from "../../../src/empty/amrdozer-effect";
import {updateRemainingTurn} from "../../../src/effect/update-remaning-turn";
import type {PermanentEffect, TurnLimitEffect} from "../../../src/state/armdozer-effect";

const permanent: PermanentEffect = {type: 'Permanent'};
const turnLimit = (turn: number): TurnLimitEffect => ({
  type: 'TurnLimit',
  remainingTurn: turn
});

test('効果継続ターン更新が正しく処理される', t => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(1)},
        {...EMPTY_ARMDOZER_EFFECT, period: permanent},
        {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(4)},
      ]
    }
  };
  const player2 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(1)},
        {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(3)}
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
            {...EMPTY_ARMDOZER_EFFECT, period: permanent},
            {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(3)},
          ]
        }
      },
      {
        ...player2,
        armdozer: {
          ...player2.armdozer,
          effects: [
            {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(2)}
          ]
        }
      }
    ],
    effect: {
      name: 'UpdateRemainingTurn',
      endArmdozerEffects: [
        {
          playerId: player1.playerId,
          effect: {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(0)}
        },
        {
          playerId: player2.playerId,
          effect: {...EMPTY_ARMDOZER_EFFECT, period: turnLimit(0)}
        }
      ]
    }
  };
  t.deepEqual(result, expected);
});