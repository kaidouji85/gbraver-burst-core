import { criticalHit } from "../../../../src/effect/battle/result/critical-hit";

test("クリティカルヒットは9999固定ダメージ", () => {
  const result = criticalHit();
  expect(result).toEqual({
    name: "CriticalHit",
    damage: 9999
  });
});