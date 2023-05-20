import {BurstCommand, parseBurstCommand} from "../../src";

test("バーストコマンドをパースできる", () => {
  const data: BurstCommand = {type: "BURST_COMMAND"};
  expect(parseBurstCommand(data)).toEqual(data);
});

test("typeの値が間違っているとパースできない", () => {
  const data = {type: "burstCommand"};
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
