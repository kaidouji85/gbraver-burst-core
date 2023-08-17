import { z } from "zod";

import { Burst } from "../../player/burst";
import { PilotSkill } from "../../player/pilot/pilot-skill";
import { PlayerId, PlayerIdSchema } from "../../player/player";
import { ArmdozerStateSchema, ArmdozerStateX } from "../armdozer-state";
import { PilotStateSchema, PilotStateX } from "../pilot-state";

/**
 * プレイヤーステート（型指定あり）
 * @template BURST バースト
 * @template PILOT パイロットスキル
 */
export type PlayerStateX<BURST, PILOT> = Readonly<{
  playerId: PlayerId;
  armdozer: ArmdozerStateX<BURST>;
  pilot: PilotStateX<PILOT>;
}>;

/** プレイヤーステート */
export type PlayerState = PlayerStateX<Burst, PilotSkill>;

/** PlayerState zodスキーマ */
export const PlayerStateSchema = z.object({
  playerId: PlayerIdSchema,
  armdozer: ArmdozerStateSchema,
  pilot: PilotStateSchema,
});

/**
 * 任意オブジェクトをPlayerStateにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parsePlayerState = (origin: unknown): PlayerState | null => {
  const result = PlayerStateSchema.safeParse(origin);
  return result.success ? result.data : null;
};