// @flow

import type {GameEndJudging} from "./game-end-judging";
import type {GameState} from "../game-state/game-state";
import {isDeath} from "../player/is-death";

/**
 * ゲーム終了判定を行う
 *
 * @param lastState 最新の状態
 * @return 判定結果
 */
export function gameEndJudging(lastState: GameState): GameEndJudging {
  const deathPlayer = lastState.players.filter(v => isDeath(v));
  if (deathPlayer.length === 2) {
    return {type: 'EvenMatch'};
  }

  const winner = lastState.players.find(v => !isDeath(v));
  if (winner && deathPlayer.length === 1) {
    return {type: 'GameOver', winner: winner.playerId};
  }

  return {type: 'GameContinue'};
}