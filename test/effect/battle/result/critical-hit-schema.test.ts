import {
  CriticalHit,
  CriticalHitSchema,
} from "../../../../src/effect/battle/result/critical-hit";

/** 有効なCriticalHit */
const criticalHit: CriticalHit = {
  name: "CriticalHit",
  damage: 9999,
};

test("CriticalHitはパースできる", () => {
  expect(CriticalHitSchema.parse(criticalHit)).toEqual(criticalHit);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(criticalHit);
  const data = JSON.parse(str);
  expect(CriticalHitSchema.parse(data)).toEqual(criticalHit);
});

test("CriticalHit以外はパースできない", () => {
  const data = {
    type: "CriticalHit",
    damaged: 9999,
  };
  expect(() => CriticalHitSchema.parse(data)).toThrow();
});
