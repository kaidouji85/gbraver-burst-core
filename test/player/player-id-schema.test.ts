import { PlayerId, PlayerIdSchema } from "../../src/player/player";

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

test("PlyerId以外は例外を投げる", () => {
  const data = 1000;
  expect(() => PlayerIdSchema.parse(data)).toThrow();
});
