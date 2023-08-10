import { ArmDozerIds, parseArmDozerId } from "../../src";

test("ArmDozerIdはパースできる", () => {
  const data = ArmDozerIds.SHIN_BRAVER;
  expect(parseArmDozerId(data)).toBe(data);
});

test("ArmDozerId以外だとnullを返す", () => {
  const data = 100;
  expect(parseArmDozerId(data)).toBe(null);
});
