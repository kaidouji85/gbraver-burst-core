import { PilotId, PilotIds, PilotIdSchema } from "../../src";

test("PilotIdはパースできる", () => {
  const data: PilotId = PilotIds.SHINYA;
  expect(PilotIdSchema.parse(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: PilotId = PilotIds.SHINYA;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(PilotIdSchema.parse(data)).toBe(origin);
});

test("PilotId以外はnullを返す", () => {
  const data = 1000;
  expect(() => PilotIdSchema.parse(data)).toThrow();
});
