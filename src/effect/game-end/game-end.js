// @flow

import type {EvenMatch, GameOver} from "../../game/end-judging/game-end-judging";

/**
 * ゲーム終了判定
 * ここにはContinueGame以外のGameEndJudgingがセットされる
 */
export type GameEndResult = GameOver | EvenMatch;

/**
 * ゲーム終了
 *
 * @typeparam {X} ゲーム終了判定
 */
export type GameEndX<X> = {
  name: 'GameEnd',

  /** 終了判定の結果 */
  result: X,
};

/** ゲーム終了 */
export type GameEnd = GameEndX<GameEndResult>;