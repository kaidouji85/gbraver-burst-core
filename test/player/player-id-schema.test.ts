import { PlayerId, PlayerIdSchema } from "../../src";

test("PlyerIdはパースできる", () => {
  const data: PlayerId = "player";
  expect(PlayerIdSchema.parse(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PlayerId = "player";
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(PlayerIdSchema.parse(data)).toBe(origin);
});

test("PlyerId以外はnullを返す", () => {
  const data = 1000;
  expect(() => PlayerIdSchema.parse(data)).toThrow();
});
