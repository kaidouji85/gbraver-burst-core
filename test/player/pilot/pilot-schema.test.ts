import { EMPTY_PILOT, Pilot, PilotSchema } from "../../../src";

test("Pilotはパースできる", () => {
  const data: Pilot = EMPTY_PILOT;
  expect(PilotSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Pilot = EMPTY_PILOT;
  const str = JSON.stringify(EMPTY_PILOT);
  const data = JSON.parse(str);
  expect(PilotSchema.parse(data)).toEqual(origin);
});

test("Pilot以外は例外を投げる", () => {
  const data = {
    id: "shinya",
  };
  expect(() => PilotSchema.parse(data)).toThrow();
});
