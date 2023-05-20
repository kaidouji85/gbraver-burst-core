import {BurstCommand, parseBurstCommand} from "../../src";

test("バーストコマンドをパースできる", () => {
  const data: BurstCommand = {type: "BURST_COMMAND"};
  expect(parseBurstCommand(data)).toEqual(data);
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
