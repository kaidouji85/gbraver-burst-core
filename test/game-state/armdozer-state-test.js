// @flow
import test from 'ava';
import {createArmdozerState} from "../../src/game-state/armdozer-state";
import type {Armdozer} from "../../src/armdozer/armdozer";
import {ArmDozerIdList} from "../../src/master/armdozers";

test('追加されたパラメータに正しい値がセットされている', t => {
  const testData: Armdozer = {
    id: ArmDozerIdList.SHIN_BRAVER,
    name: 'name',
    maxHp: 3000,
    maxBattery: 5,
    power: 2000,
    speed: 2000
  };
  const ret = createArmdozerState(testData);
  t.is(ret.hp, testData.maxHp);
  t.is(ret.battery, testData.maxBattery);
});
