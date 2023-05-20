import {BatteryCommand} from "../../src";
import {parseBatteryCommand} from "../../src/command/battery";

test("バッテリーコマンドを正しくパースできる", () => {
  const data: BatteryCommand = {type: "BATTERY_COMMAND", battery: 4};
  expect(parseBatteryCommand(data)).toEqual(data);
});

test("batteryが整数でないとパースできない", () => {
  const data = {type: "BATTERY_COMMAND", battery: 3.2};
  expect(parseBatteryCommand(data)).toEqual(null);
});

test("プロパティが足りないとパースできない", () => {
  const data = {type: "BATTERY_COMMAND"};
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

