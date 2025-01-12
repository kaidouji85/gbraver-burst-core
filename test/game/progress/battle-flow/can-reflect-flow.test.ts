import { CriticalHit, Feint, Guard, Miss, NormalHit } from "../../../../src";
import { canReflectFlow } from "../../../../src/game/progress/battle-flow/reflect-flow";

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

test("通常ヒットの場合はダメージ反射を行う", () => {
  const result = canReflectFlow(normalHit);
  expect(result).toBe(true);
});

test("ガードの場合はダメージ反射を行う", () => {
  const result = canReflectFlow(guard);
  expect(result).toBe(true);
});

test("クリティカルの場合はダメージ反射を行う", () => {
  const result = canReflectFlow(criticalHit);
  expect(result).toBe(true);
});

test("ミスの場合はダメージ反射をしない", () => {
  const result = canReflectFlow(miss);
  expect(result).toBe(false);
});

test("フェイントの場合はダメージ反射をしない", () => {
  const result = canReflectFlow(feint);
  expect(result).toBe(false);
});
