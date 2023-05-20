import { BatteryCommand, parseBatteryCommand } from "../../src";

test("バッテリーコマンドを正しくパースできる", () => {
  const data: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  expect(parseBatteryCommand(data)).toEqual(data);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  const data = { ...origin, test: 12 };
  expect(parseBatteryCommand(data)).toEqual(origin);
});

test("batteryが整数でないとパースできない", () => {
  const data = { type: "BATTERY_COMMAND", battery: 3.2 };
  expect(parseBatteryCommand(data)).toEqual(null);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "batteryCommand", battery: 3 };
  expect(parseBatteryCommand(data)).toEqual(null);
});

test("プロパティが足りないとパースできない", () => {
  const data = { type: "BATTERY_COMMAND" };
  expect(parseBatteryCommand(data)).toEqual(null);
});

test("空オブジェクトはパースできない", () => {
  expect(parseBatteryCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parseBatteryCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parseBatteryCommand(undefined)).toEqual(null);
});
