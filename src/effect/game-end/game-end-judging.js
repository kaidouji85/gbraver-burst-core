// @flow

import type {PlayerId} from "../../player/player";
import type {GameState} from '../../state/game-state';
import {isPlayerDeath} from '../../state/player-state';

/** ゲーム終了判定の結果をまとめたもの */
export type GameEndJudging = GameOver | EvenMatch | GameContinue;

/** 勝負あり */
export type GameOver = {
  type: 'GameOver',
  /** 勝利したプレイヤーのID */
  winner: PlayerId,
};

/** 引き分け */
export type EvenMatch = {
  type: 'EvenMatch'
};

/** ゲーム続行 */
export type GameContinue = {
  type: 'GameContinue'
};

/**
 * ゲーム終了判定を行う
 *
 * @param lastState 最新の状態
 * @return 判定結果
 */
 export function gameEndJudging(lastState: GameState): GameEndJudging {
  const deathPlayer = lastState.players.filter(v => isPlayerDeath(v));
  if (deathPlayer.length === 2) {
    return {type: 'EvenMatch'};
  }

  const winner = lastState.players.find(v => !isPlayerDeath(v));
  if (winner && deathPlayer.length === 1) {
    return {type: 'GameOver', winner: winner.playerId};
  }

  return {type: 'GameContinue'};
}