// @flow

import test from 'ava';
import type {Battle} from "../../../src";
import {EMPTY_BATTLE} from "../../../src/empty-data/battle";
import {canRightItself} from "../../../src/effect/right-itself";

test('戦闘で死亡していなければ、体勢整えを実施する', t => {
  const data: Battle = {
    ...EMPTY_BATTLE,
    isDeath: false
  };
  const result = canRightItself(data);
  t.true(result);
});

test('戦闘で死亡していれば、体勢整えは行わない', t => {
  const data: Battle = {
    ...EMPTY_BATTLE,
    isDeath: true
  };
  const result = canRightItself(data);
  t.false(result);
});