import { parsePilotSkillCommand, PilotSkillCommand } from "../../src";

test("パイロットスキルコマンドをパースできる", () => {
  const data: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  expect(parsePilotSkillCommand(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parsePilotSkillCommand(data)).toEqual(origin);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(parsePilotSkillCommand(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "pilotSkillCommand" };
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
