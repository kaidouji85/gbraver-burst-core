// @flow

import test from 'ava';
import type {PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {canContinuousActive} from "../../../../src/effect/continuous-active";

test('アクティブ継続ありの判定が正しくできる', t => {
  const activePlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'activePlayer',
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
  const otherPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer'
  };
  const state = {
    ...EMPTY_GAME_STATE,
    players: [activePlayer, otherPlayer],
    activePlayerId: activePlayer.playerId
  };

  const result = canContinuousActive(state);
  t.true(result);
});

test('アクティブ継続効果を持たない場合はfalseを返す', t => {
  const activePlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'activePlayer',
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
  const otherPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer'
  };
  const state = {
    ...EMPTY_GAME_STATE,
    players: [activePlayer, otherPlayer],
    activePlayerId: activePlayer.playerId
  };
  const result = canContinuousActive(state);
  t.false(result);
});

test('アームドーザ効果を持たない場合はfalseを返す', t => {
  const activePlayer: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'activePlayer',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      effects: []
    }
  };
  const otherPlayer = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'otherPlayer'
  };
  const state = {
    ...EMPTY_GAME_STATE,
    players: [activePlayer, otherPlayer],
    activePlayerId: activePlayer.playerId
  };
  const result = canContinuousActive(state);
  t.false(result);
});