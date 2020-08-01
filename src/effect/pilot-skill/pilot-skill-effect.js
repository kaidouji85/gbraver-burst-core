// @flow

import type {PlayerId} from "../..";
import type {PilotSkill} from "../../player/pilot";

/**
 * パイロットスキル発動
 */
export type PilotSkillEffect = {
  name: 'PilotSkillEffect',
  invokerId: PlayerId,
  effect: PilotSkill,
};