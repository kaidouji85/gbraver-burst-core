// @flow

import test from 'ava';
import type {BattleResult} from "../../../src";
import {canReflectFlow} from "../../../src/game/progress/reflect-flow";

test('通常ヒットの場合はダメージ反射を行う', t => {
  const battleResult: BattleResult = {
    name: 'NormalHit',
    damage: 1000
  };

  const result = canReflectFlow(battleResult);
  t.true(result);
});

test('ガードの場合はダメージ反射を行う', t => {
  const battleResult: BattleResult = {
    name: 'Guard',
    damage: 1000
  };

  const result = canReflectFlow(battleResult);
  t.true(result);
});

test('クリティカルの場合はダメージ反射を行う', t => {
  const battleResult: BattleResult = {
    name: 'CriticalHit',
    damage: 1000
  };

  const result = canReflectFlow(battleResult);
  t.true(result);
});

test('ミスの場合はダメージ反射をしない', t => {
  const battleResult: BattleResult = {
    name: 'Miss'
  };

  const result = canReflectFlow(battleResult);
  t.false(result);
});
