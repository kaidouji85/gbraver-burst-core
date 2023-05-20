import { BurstCommand, parseBurstCommand } from "../../src";

test("バーストコマンドをパースできる", () => {
  const data: BurstCommand = { type: "BURST_COMMAND" };
  expect(parseBurstCommand(data)).toEqual(data);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: BurstCommand = { type: "BURST_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(parseBurstCommand(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "burstCommand" };
  expect(parseBurstCommand(data)).toEqual(null);
});

test("空オブジェクトはパースできない", () => {
  expect(parseBurstCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parseBurstCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parseBurstCommand(undefined)).toEqual(null);
});
