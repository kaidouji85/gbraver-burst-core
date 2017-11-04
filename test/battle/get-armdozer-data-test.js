// @flow
import test from 'ava';
import {DEFAULT_ARMDOZER, getArmDozerData} from "../../src/battle/get-armdozer-data";
import type {ArmDozerBasicStatus} from "../../src/flow-type";

const MASTERS: ArmDozerBasicStatus[] = [{
  id: 'test01',
  name: 'test01',
  maxHp: 1000,
  maxBattery: 5,
  power: 1000,
  speed: 1000
}, {
  id: 'test02',
  name: 'test02',
  maxHp: 2000,
  maxBattery: 5,
  power: 2000,
  speed: 2000
}];

test('マスタに存在するIDを指定してデータを取得する', t => {
  const target = getArmDozerData('test01', MASTERS);
  t.deepEqual(target, MASTERS[0]);
});

test('マスタに存在しないIDを指定したらデフォルト値を返す', t => {
  const target = getArmDozerData('no-exist', MASTERS);
  t.deepEqual(target, DEFAULT_ARMDOZER);
});