// @flow

import type {PlayerId} from "../../player/player";

/** ゲーム終了 */
export type EndGame = {
  name: 'EndGame',
  /** 勝利したプレイヤーのID */
  winner: PlayerId
};