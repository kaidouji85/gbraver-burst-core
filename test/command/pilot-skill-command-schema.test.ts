import { PilotSkillCommand, PilotSkillCommandSchema } from "../../src";

test("パイロットスキルコマンドをパースできる", () => {
  const data: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  expect(PilotSkillCommandSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(PilotSkillCommandSchema.parse(data)).toEqual(origin);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(PilotSkillCommandSchema.parse(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "pilotSkillCommand" };
  expect(() => PilotSkillCommandSchema.parse(data)).toThrow();
});

test("空オブジェクトはパースできない", () => {
  expect(() => PilotSkillCommandSchema.parse({})).toThrow();
});

test("nullはパースできない", () => {
  expect(() => PilotSkillCommandSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => PilotSkillCommandSchema.parse(undefined)).toThrow();
});
