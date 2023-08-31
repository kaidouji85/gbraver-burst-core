import { ArmdozerId, ArmdozerIds, ArmdozerIdSchema } from "../../src";

test("ArmDozerIdはパースできる", () => {
  const data: ArmdozerId = ArmdozerIds.SHIN_BRAVER;
  expect(ArmdozerIdSchema.parse(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: ArmdozerId = ArmdozerIds.SHIN_BRAVER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(ArmdozerIdSchema.parse(data)).toBe(origin);
});

test("ArmDozerId以外だとnullを返す", () => {
  const data = 100;
  expect(() => ArmdozerIdSchema.parse(data)).toThrow();
});
