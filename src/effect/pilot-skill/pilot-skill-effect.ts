import { PilotSkill } from "../../player/pilot/pilot-skill";
import type { PlayerId } from "../../player/player";

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
