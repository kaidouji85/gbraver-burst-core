import { ArmDozerId, ArmDozerIds, ArmDozerIdSchema } from "../../src";

test("ArmDozerIdはパースできる", () => {
  const data: ArmDozerId = ArmDozerIds.SHIN_BRAVER;
  expect(ArmDozerIdSchema.parse(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: ArmDozerId = ArmDozerIds.SHIN_BRAVER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(ArmDozerIdSchema.parse(data)).toBe(origin);
});

test("ArmDozerId以外だとnullを返す", () => {
  const data = 100;
  expect(() => ArmDozerIdSchema.parse(data)).toThrow();
});
