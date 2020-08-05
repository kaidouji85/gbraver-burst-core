// @flow

import test from 'ava';
import type {ArmdozerState} from "../../../../src";
import {EMPTY_ARMDOZER_STATE} from "../../../data/armdozer";
import type {RecoverBatterySkill} from "../../../../src/player/pilot";
import {calcRecoverBattery} from "../../../../src/effect/pilot-skill/recover-battery";

test('パイロットスキル バッテリー回復後のバッテリーが正しく計算できる', t => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    maxBattery: 5,
    battery: 1
  };
  const skill: RecoverBatterySkill = {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  };
  const result = calcRecoverBattery(armdozer, skill);
  t.is(result, 3);
});

test('バッテリー上限以上にはならない', t => {
  const armdozer: ArmdozerState = {
    ...EMPTY_ARMDOZER_STATE,
    maxBattery: 5,
    battery: 4
  };
  const skill: RecoverBatterySkill = {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  };
  const result = calcRecoverBattery(armdozer, skill);
  t.is(result, 5);
});

