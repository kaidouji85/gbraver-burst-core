import { BurstCommand, BurstCommandSchema } from "../../src";

test("バーストコマンドをパースできる", () => {
  const data: BurstCommand = { type: "BURST_COMMAND" };
  expect(BurstCommandSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: BurstCommand = { type: "BURST_COMMAND" };
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(BurstCommandSchema.parse(data)).toEqual(origin);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: BurstCommand = { type: "BURST_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(BurstCommandSchema.parse(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "burstCommand" };
  expect(() => BurstCommandSchema.parse(data)).toThrow();
});

test("空オブジェクトはパースできない", () => {
  expect(() => BurstCommandSchema.parse({})).toThrow();
});

test("nullはパースできない", () => {
  expect(() => BurstCommandSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => BurstCommandSchema.parse(undefined)).toThrow();
});
