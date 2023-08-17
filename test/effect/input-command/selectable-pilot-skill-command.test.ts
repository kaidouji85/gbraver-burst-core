import { PilotSkillCommand } from "../../../src";
import { selectablePilotSkillCommand } from "../../../src/effect/input-command/selectable-pilot-skill-command";
import { EMPTY_PILOT_STATE } from "../../../src/empty/pilot";
import { PilotState } from "../../../src/state/pilot-state/pilot-state";

test("パイロットスキル利用可能フラグ=true の場合が正しく処理できる", () => {
  const pilot: PilotState = { ...EMPTY_PILOT_STATE, enableSkill: true };
  const result = selectablePilotSkillCommand(pilot);
  const expected = [
    {
      type: "PILOT_SKILL_COMMAND",
    },
  ];
  expect(result).toEqual(expected);
});

test("パイロットスキル利用可能フラグ=false の場合が正しく処理できる", () => {
  const pilot: PilotState = { ...EMPTY_PILOT_STATE, enableSkill: false };
  const result = selectablePilotSkillCommand(pilot);
  const expected: PilotSkillCommand[] = [];
  expect(result).toEqual(expected);
});
