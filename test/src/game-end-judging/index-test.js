// @flow

import * as test from 'ava';
import type {GameState} from "../../../src/game-state/game-state";
import {EMPTY_GAME_STATE} from "../../data/game-state";
import {EMPTY_PLAYER_STATE} from "../../data/player";
import {EMPTY_ARMDOZER} from "../../data/armdozer";
import {gameEndJudging} from "../../../src/game-end-judging";

test('1人だけHPが0なら、HPが0より大きいプレイヤーの勝ち', t => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 0
    }
  };
  const player2 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 1000
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2]
  };

  const result = gameEndJudging(lastState);
  t.deepEqual(result, {
    type: 'GameOver',
    winner: 'player2'
  });
});

test('2人ともHPが0なら引き分け', t => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 0
    }
  };
  const player2 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 0
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2]
  };

  const result = gameEndJudging(lastState);
  t.deepEqual(result, {
    type: 'EvenMatch'
  });
});

test('2人ともHPが0よりも大きければゲーム続行j', t => {
  const player1 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 1000
    }
  };
  const player2 = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 1000
    }
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [player1, player2]
  };

  const result = gameEndJudging(lastState);
  t.deepEqual(result, {
    type: 'GameContinue'
  });
});