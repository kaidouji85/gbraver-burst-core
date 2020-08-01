// @flow

import type {ArmdozerX} from "./armdozer";
import type {Burst} from "./burst";
import type {Pilot} from "./pilot";

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

  /** パイロット */
  pilot: Pilot;
};

/** プレイヤー基本情報 */
export type Player = PlayerX<Burst>;