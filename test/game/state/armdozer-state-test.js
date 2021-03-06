// @flow
import test from 'ava';
import {createArmdozerState} from "../../../src/state/armdozer-state";
import type {Armdozer} from "../../../src/player/armdozer";
import {EMPTY_ARMDOZER} from "../../../src/empty/armdozer";

test('追加されたパラメータに正しい値がセットされている', t => {
  const data: Armdozer = {
    ...EMPTY_ARMDOZER,
    hp: 3000,
    battery: 5
  };
  const result = createArmdozerState(data);
  t.deepEqual(result, {
    ...data,
    maxHp: 3000,
    maxBattery: 5,
    enableBurst: true,
    effects: [],
  });
});
