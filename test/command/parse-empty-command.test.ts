import { EmptyCommand, parseEmptyCommand } from "../../src";

test("コマンド未入力状態をパースできる", () => {
  const data: EmptyCommand = { type: "EMPTY_COMMAND" };
  expect(parseEmptyCommand(data)).toEqual(data);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: EmptyCommand = { type: "EMPTY_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(parseEmptyCommand(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "emptyCommand" };
  expect(parseEmptyCommand(data)).toEqual(null);
});

test("空オブジェクトはパースできない", () => {
  expect(parseEmptyCommand({})).toEqual(null);
});

test("nullはパースできない", () => {
  expect(parseEmptyCommand(null)).toEqual(null);
});

test("undefinedはパースできない", () => {
  expect(parseEmptyCommand(undefined)).toEqual(null);
});
