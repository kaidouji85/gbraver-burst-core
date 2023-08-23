import { EmptyCommand, EmptyCommandSchema } from "../../src";

test("コマンド未入力状態をパースできる", () => {
  const data: EmptyCommand = { type: "EMPTY_COMMAND" };
  expect(EmptyCommandSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: EmptyCommand = { type: "EMPTY_COMMAND" };
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(EmptyCommandSchema.parse(data)).toEqual(origin);
});

test("余計なプロパティを削除してパースする", () => {
  const origin: EmptyCommand = { type: "EMPTY_COMMAND" };
  const data = { ...origin, test: 12 };
  expect(EmptyCommandSchema.parse(data)).toEqual(origin);
});

test("typeの値が間違っているとパースできない", () => {
  const data = { type: "emptyCommand" };
  expect(() => EmptyCommandSchema.parse(data)).toThrow();
});

test("空オブジェクトはパースできない", () => {
  expect(() => EmptyCommandSchema.parse({})).toThrow();
});

test("nullはパースできない", () => {
  expect(() => EmptyCommandSchema.parse(null)).toThrow();
});

test("undefinedはパースできない", () => {
  expect(() => EmptyCommandSchema.parse(undefined)).toThrow();
});
