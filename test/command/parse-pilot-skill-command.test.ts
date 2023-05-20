import {parsePilotSkillCommand, PilotSkillCommand} from "../../src";

test("パイロットスキルコマンドをパースできる", () => {
  const data: PilotSkillCommand = {type: "PILOT_SKILL_COMMAND"};
  expect(parsePilotSkillCommand(data)).toEqual(data);
});

test("typeの値が間違っているとパースできない", () => {
  const data = {type: "pilotSkillCommand"};
  expect(parsePilotSkillCommand(data)).toEqual(null);
});

test("空オブジェクトはパースできない", () => {
  expect(parsePilotSkillCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parsePilotSkillCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parsePilotSkillCommand(undefined)).toEqual(null);
});
