import { parsePlayerId, PlayerId } from "../../src";

test("PlyerIdはパースできる", () => {
  const data: PlayerId = "player";
  expect(parsePlayerId(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PlayerId = "player";
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parsePlayerId(data)).toBe(origin);
});

test("PlyerId以外はnullを返す", () => {
  const data = 1000;
  expect(parsePlayerId(data)).toBe(null);
});
