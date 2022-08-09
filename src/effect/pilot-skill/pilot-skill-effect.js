// @flow

import type {PilotSkill} from "../../player/pilot";
import type {PlayerId} from "../../player/player";

/**
 * パイロットスキル発動
 */
export type PilotSkillEffect = PilotSkillEffectX<PilotSkill>;

/**
 * パイロットスキル発動
 */
export type PilotSkillEffectX<SKILL: PilotSkill> = {
  name: 'PilotSkillEffect',
  /**
   * パイロットスキル発動者
   */
  invokerId: PlayerId,

  /**
   * 発動スキル
   */
  skill: SKILL,
}