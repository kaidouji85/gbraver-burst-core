import { z } from "zod";

import { ArmdozerSchema, ArmdozerX } from "./armdozer";
import { Burst } from "./burst";
import { PilotSchema, PilotX } from "./pilot";
import { PilotSkill } from "./pilot/pilot-skill";

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

/** Player zodスキーマ */
export const PlayerSchema = z.object({
  playerId: PlayerIdSchema,
  armdozer: ArmdozerSchema,
  pilot: PilotSchema,
});
