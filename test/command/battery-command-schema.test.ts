import {
  BatteryCommand,
  BatteryCommandSchema,
} from "../../src/command/battery";

test("バッテリーコマンドを正しくパースできる", () => {
  const data: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  expect(BatteryCommandSchema.parse(data)).toEqual(data);
});

test("文字列からパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(BatteryCommandSchema.parse(data)).toEqual(origin);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: BatteryCommand = { type: "BATTERY_COMMAND", battery: 4 };
  const data = { ...origin, test: 12 };
  expect(BatteryCommandSchema.parse(data)).toEqual(origin);
});

test("batteryが整数でないとパースできない", () => {
  const data = { type: "BATTERY_COMMAND", battery: 3.2 };
  expect(() => BatteryCommandSchema.parse(data)).toThrow();
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "batteryCommand", battery: 3 };
  expect(() => BatteryCommandSchema.parse(data)).toThrow();
});

test("プロパティが足りないとパースできない", () => {
  const data = { type: "BATTERY_COMMAND" };
  expect(() => BatteryCommandSchema.parse(data)).toThrow();
});

test("空オブジェクトはパースできない", () => {
  expect(() => BatteryCommandSchema.parse({})).toThrow();
});

test("nullはパースできない", () => {
  expect(() => BatteryCommandSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => BatteryCommandSchema.parse(undefined)).toThrow();
});
