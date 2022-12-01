// @flow

import type { BattleResult } from "../../../../src";
import { canReflectFlow } from "../../../../src/game/progress/battle-flow/reflect-flow";

test("通常ヒットの場合はダメージ反射を行う", () => {
  const battleResult: BattleResult = {
    name: "NormalHit",
    damage: 1000,
  };

  const result = canReflectFlow(battleResult);
  expect(result).toBe(true);
});

test("ガードの場合はダメージ反射を行う", () => {
  const battleResult: BattleResult = {
    name: "Guard",
    damage: 1000,
  };

  const result = canReflectFlow(battleResult);
  expect(result).toBe(true);
});

test("クリティカルの場合はダメージ反射を行う", () => {
  const battleResult: BattleResult = {
    name: "CriticalHit",
    damage: 1000,
  };

  const result = canReflectFlow(battleResult);
  expect(result).toBe(true);
});

test("ミスの場合はダメージ反射をしない", () => {
  const battleResult: BattleResult = {
    name: "Miss",
  };

  const result = canReflectFlow(battleResult);
  expect(result).toBe(false);
});
