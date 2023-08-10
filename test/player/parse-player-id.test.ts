import { parsePlayerId, PlayerId } from "../../src";

test("PlyerIdはパースできる", () => {
  const data: PlayerId = "player";
  expect(parsePlayerId(data)).toBe(data);
});

test("PlyerId以外はnullを返す", () => {
  const data = 1000;
  expect(parsePlayerId(data)).toBe(null);
});