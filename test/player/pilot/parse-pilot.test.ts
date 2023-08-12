import { EMPTY_PILOT, parsePilot } from "../../../src";

test("Pilotはパースできる", () => {
  const data = EMPTY_PILOT;
  expect(parsePilot(data)).toEqual(data);
});

test("Pilot以外はnullを返す", () => {
  const data = {
    id: "shinya",
  };
  expect(parsePilot(data)).toBe(null);
});
