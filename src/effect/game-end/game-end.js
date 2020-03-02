// @flow

import type {EvenMatch, GameOver} from "../../game/end-judging/game-end-judging";

/**
 * 終了判定の結果
 * ここにはContinueGame以外のGameEndJudgingがセットされる
 */
export type GameEndResult = GameOver | EvenMatch;

/** ゲーム終了 */
export type GameEnd = {
  name: 'GameEnd',

  /** 終了判定の結果 */
  result: GameEndResult,
};