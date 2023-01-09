import type { PilotSkillCommand } from "../../command/pilot-skill";
import type { PilotState } from "../../state/pilot-state";

/**
 * 現在、利用可能なパイロットスキルコマンドを返す
 *
 * @param pilot パイロットステート
 * @return 利用可能なパイロットスキルコマンド
 */
export function selectablePilotSkillCommand(
  pilot: PilotState
): PilotSkillCommand[] {
  return pilot.enableSkill
    ? [
        {
          type: "PILOT_SKILL_COMMAND",
        },
      ]
    : [];
}
