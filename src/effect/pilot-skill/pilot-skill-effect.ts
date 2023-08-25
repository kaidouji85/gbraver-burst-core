import { z } from "zod";

import { PilotSkill, PilotSkillSchema } from "../../player/pilot/pilot-skill";
import { PlayerId, PlayerIdSchema } from "../../player/player";

/**
 * パイロットスキル発動（型指定あり）
 * @template SKILL パイロットスキル
 */
export type PilotSkillEffectX<SKILL extends PilotSkill> = Readonly<{
  name: "PilotSkillEffect";
  /** パイロットスキル発動者 */
  invokerId: PlayerId;
  /** 発動スキル */
  skill: SKILL;
}>;

/** パイロットスキル発動 */
export type PilotSkillEffect = PilotSkillEffectX<PilotSkill>;

/** PilotSkillEffect zodスキーマ */
export const PilotSkillEffectSchema = z.object({
  name: z.literal("PilotSkillEffect"),
  invokerId: PlayerIdSchema,
  skill: PilotSkillSchema,
});
