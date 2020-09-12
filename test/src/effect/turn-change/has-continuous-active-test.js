// @flow

import test from 'ava';
import {hasContinuousActivePlayer} from "../../../../src/effect/continuous-active/continuous-active";
import type {PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";

test('アクティブ継続ありの判定が正しくできる', t => {
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      effects: [
        {
          type: 'ContinuousActivePlayer',
          remainingTurn: Infinity
        }
      ]
    }
  };

  const result = hasContinuousActivePlayer(player);
  t.true(result);
});

test('アクティブ継続効果を持たない場合はfalseを返す', t => {
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      effects: [
        {
          type: 'CorrectPower',
          power: 1000,
          remainingTurn: 2
        }
      ]
    }
  };

  const result = hasContinuousActivePlayer(player);
  t.false(result);
});

test('アームドーザ効果を持たない場合はfalseを返す', t => {
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      effects: []
    }
  };

  const result = hasContinuousActivePlayer(player);
  t.false(result);
});