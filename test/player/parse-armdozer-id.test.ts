import { ArmDozerId, ArmDozerIds, parseArmDozerId } from "../../src";

test("ArmDozerIdはパースできる", () => {
  const data: ArmDozerId = ArmDozerIds.SHIN_BRAVER;
  expect(parseArmDozerId(data)).toBe(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: ArmDozerId = ArmDozerIds.SHIN_BRAVER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parseArmDozerId(data)).toBe(origin);
});

test("ArmDozerId以外だとnullを返す", () => {
  const data = 100;
  expect(parseArmDozerId(data)).toBe(null);
});
