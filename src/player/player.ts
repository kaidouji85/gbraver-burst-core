import { z } from "zod";

import type { ArmdozerX } from "./armdozer";
import type { Burst } from "./burst";
import type { PilotSkill, PilotX } from "./pilot";

/** プレイヤーID */
export type PlayerId = string;

/** プレイヤーID zodスキーマ */
export const PlayerIdSchema = z.string();

/**
 * プレイヤー基本情報
 * @template BURST バースト
 * @template PILOT パイロットスキル
 */
export type PlayerX<BURST, PILOT> = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** アームドーザデータ */
  armdozer: ArmdozerX<BURST>;
  /** パイロット */
  pilot: PilotX<PILOT>;
}>;

/** プレイヤー基本情報 */
export type Player = PlayerX<Burst, PilotSkill>;
