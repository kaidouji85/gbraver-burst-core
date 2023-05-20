import {
  BatteryCommand,
  BurstCommand,
  parseCommand,
  PilotSkillCommand,
} from "../../src";

test("バッテリーコマンドをパースできる", () => {
  const data: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  expect(parseCommand(data)).toEqual(data);
});

test("バーストコマンドをパースできる", () => {
  const data: BurstCommand = { type: "BURST_COMMAND" };
  expect(parseCommand(data)).toEqual(data);
});

test("パイロットスキルコマンドをパースできる", () => {
  const data: PilotSkillCommand = { type: "PILOT_SKILL_COMMAND" };
  expect(parseCommand(data)).toEqual(data);
});

test("空オブジェクトはパースできない", () => {
  expect(parseCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parseCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parseCommand(undefined)).toEqual(null);
});
