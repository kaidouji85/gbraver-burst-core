// @flow

import type {Armdozer} from "../armdozer/armdozer";

/** プレイヤーID */
export type PlayerId = string;

/** プレイヤー基本情報 */
export type Player = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザデータ */
  armdozer: Armdozer;
};