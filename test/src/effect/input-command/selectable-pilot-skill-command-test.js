// @flow

import test from 'ava';
import type {PilotState} from "../../../../src/state/pilot-state";
import {EMPTY_PILOT_STATE} from "../../../data/pilot";
import {selectablePilotSkillCommand} from "../../../../src/effect/input-command/selectable-pilot-skill-command";

test('パイロットスキル利用可能フラグ=true の場合が正しく処理できる', t => {
  const pilot: PilotState = {
    ...EMPTY_PILOT_STATE,
    enableSkill: true
  };
  const result = selectablePilotSkillCommand(pilot);
  const expected = [{type: 'PILOT_SKILL_COMMAND'}];
  t.deepEqual(result, expected);
});

test('パイロットスキル利用可能フラグ=false の場合が正しく処理できる', t => {
  const pilot: PilotState = {
    ...EMPTY_PILOT_STATE,
    enableSkill: false
  };
  const result = selectablePilotSkillCommand(pilot);
  const expected = [];
  t.deepEqual(result, expected);
});