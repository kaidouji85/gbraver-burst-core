import { parsePilotId, PilotId, PilotIds } from "../../src";

test("PilotIdはパースできる", () => {
  const data: PilotId = PilotIds.SHINYA;
  expect(parsePilotId(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PilotId = PilotIds.SHINYA;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parsePilotId(data)).toBe(origin);
});

test("PilotId以外はnullを返す", () => {
  const data = 1000;
  expect(parsePilotId(data)).toBe(null);
});
