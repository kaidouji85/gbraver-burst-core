import { CriticalHit, Feint, Guard, Miss, NormalHit } from "../../../../src";
import { isAttackHit } from "../../../../src/effect/battle/result/is-attack-hit";

/** 通常ヒット */
const normalHit: NormalHit = { name: "NormalHit", damage: 2000 };

/** ガード */
const guard: Guard = { name: "Guard", damage: 1000 };

/** クリティカル */
const criticalHit: CriticalHit = { name: "CriticalHit", damage: 9999 };

/** ミス */
const miss: Miss = { name: "Miss" };

/** フェイント */
const feint: Feint = { name: "Feint", isDefenderMoved: true };

test("通常ヒットは攻撃ヒットである", () => {
  const result = isAttackHit(normalHit);
  expect(result).toBe(true);
});

test("ガードは攻撃ヒットである", () => {
  const result = isAttackHit(guard);
  expect(result).toBe(true);
});

test("クリティカルは攻撃ヒットである", () => {
  const result = isAttackHit(criticalHit);
  expect(result).toBe(true);
});

test("ミスは攻撃ヒットでない", () => {
  const result = isAttackHit(miss);
  expect(result).toBe(false);
});

test("フェイントは攻撃ヒットでない", () => {
  const result = isAttackHit(feint);
  expect(result).toBe(false);
});
