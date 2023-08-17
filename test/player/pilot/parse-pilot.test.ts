import { EMPTY_PILOT, parsePilot,Pilot } from "../../../src";

test("Pilotはパースできる", () => {
  const data: Pilot = EMPTY_PILOT;
  expect(parsePilot(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Pilot = EMPTY_PILOT;
  const str = JSON.stringify(EMPTY_PILOT);
  const data = JSON.parse(str);
  expect(parsePilot(data)).toEqual(origin);
});

test("Pilot以外はnullを返す", () => {
  const data = {
    id: "shinya",
  };
  expect(parsePilot(data)).toBe(null);
});
