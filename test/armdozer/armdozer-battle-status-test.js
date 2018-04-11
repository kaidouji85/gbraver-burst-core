// @flow
import test from 'ava';
import {createArmDozerBattleStatus} from "../../src/armdozer/armdozer-battle-status";
import type {ArmdozerStatus} from "../../src/armdozer/armdozer-status";
import {ArmDozerIdList} from "../../src/master/armdozers";

test('追加されたパラメータに正しい値がセットされている', t => {
  const testData: ArmdozerStatus = {
    id: ArmDozerIdList.SHIN_BRAVER,
    name: 'name',
    maxHp: 3000,
    maxBattery: 5,
    power: 2000,
    speed: 2000
  };
  const ret = createArmDozerBattleStatus(testData);
  t.is(ret.hp, testData.maxHp);
  t.is(ret.battery, testData.maxBattery);
});
