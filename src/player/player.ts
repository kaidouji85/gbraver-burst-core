import { z } from "zod";

import type { ArmdozerX } from "./armdozer";
import type { Burst } from "./burst";
import type { PilotSkill, PilotX } from "./pilot";

/** プレイヤーID */
export type PlayerId = string;

/** プレイヤーID zodスキーマ */
export const PlayerIdSchema = z.string();

/**
 * 任意オブジェクトをPlayerIdにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePlayerId = (origin: unknown): PlayerId | null => {
  const result = PlayerIdSchema.safeParse(origin);
  return result.success ? result.data : null;
};

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
