import { parsePilotId, PilotId, PilotIds } from "../../src";

test("PilotIdはパースできる", () => {
  const data: PilotId = PilotIds.SHINYA;
  expect(parsePilotId(data)).toBe(data);
});

test("PilotId以外はnullを返す", () => {
  const data = 1000;
  expect(parsePilotId(data)).toBe(null);
});
