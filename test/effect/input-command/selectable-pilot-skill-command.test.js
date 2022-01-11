// @flow

import type {PilotState} from "../../../src/state/pilot-state";
import {EMPTY_PILOT_STATE} from "../../../src/empty/pilot";
import {selectablePilotSkillCommand} from "../../../src/effect/input-command/selectable-pilot-skill-command";

test('パイロットスキル利用可能フラグ=true の場合が正しく処理できる', () => {
  const pilot: PilotState = {
    ...EMPTY_PILOT_STATE,
    enableSkill: true
  };
  const result = selectablePilotSkillCommand(pilot);
  const expected = [{type: 'PILOT_SKILL_COMMAND'}];
  expect(result).toEqual(expected);
});

test('パイロットスキル利用可能フラグ=false の場合が正しく処理できる', () => {
  const pilot: PilotState = {
    ...EMPTY_PILOT_STATE,
    enableSkill: false
  };
  const result = selectablePilotSkillCommand(pilot);
  const expected = [];
  expect(result).toEqual(expected);
});