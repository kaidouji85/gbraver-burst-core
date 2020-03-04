// @flow

import type {ArmdozerX} from "./armdozer/armdozer";
import type {Burst} from "./armdozer/burst";

/** プレイヤーID */
export type PlayerId = string;

/**
 * プレイヤー基本情報
 *
 * @typeparam {X} バースト
 */
export type PlayerX<X> = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザデータ */
  armdozer: ArmdozerX<X>;
};

/** プレイヤー基本情報 */
export type Player = PlayerX<Burst>;