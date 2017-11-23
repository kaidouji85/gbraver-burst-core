// @flow
import test from 'ava';
import {createArmDozerBattleState} from "../../src/initial-state/create-armdozer-battle-state";
import type {ArmDozerBasicStatus} from "../../src/flow-type";
import {ArmDozerIdList} from "../../src/master/armdozers";

test('追加されたパラメータに正しい値がセットされている', t => {
  const testData: ArmDozerBasicStatus = {
    id: ArmDozerIdList.SHIN_BRAVER,
    name: 'name',
    maxHp: 3000,
    maxBattery: 5,
    power: 2000,
    speed: 2000
  };
  const ret = createArmDozerBattleState(testData);
  t.is(ret.hp, testData.maxHp);
  t.is(ret.battery, testData.maxBattery);
});
