// @flow

import type {PilotState} from "../../game/state/pilot-state";
import type {PilotSkillCommand} from "../../command/pilot-skill";

/**
 * 現在、利用可能なパイロットスキルコマンドを返す
 *
 * @param pilot パイロットステート
 * @return 利用可能なパイロットスキルコマンド
 */
export function selectablePilotSkillCommand(pilot: PilotState): PilotSkillCommand[] {
  return pilot.enableSkill
    ? [{type: 'PILOT_SKILL_COMMAND'}]
    : [];
}
