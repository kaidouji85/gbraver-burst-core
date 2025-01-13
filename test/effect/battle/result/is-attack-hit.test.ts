import { isAttackHit } from "../../../../src/effect/battle/result/is-attack-hit";

test("通常ヒットは攻撃ヒットである", () => {
  expect(isAttackHit({ name: "NormalHit", damage: 2000 })).toBe(true);
});

test("ガードは攻撃ヒットである", () => {
  expect(isAttackHit({ name: "Guard", damage: 1000 })).toBe(true);
});

test("クリティカルは攻撃ヒットである", () => {
  expect(isAttackHit({ name: "CriticalHit", damage: 9999 })).toBe(true);
});

test("ミスは攻撃ヒットでない", () => {
  expect(isAttackHit({ name: "Miss" })).toBe(false);
});

test("フェイントは攻撃ヒットでない", () => {
  expect(isAttackHit({ name: "Feint", isDefenderMoved: true })).toBe(false);
});
