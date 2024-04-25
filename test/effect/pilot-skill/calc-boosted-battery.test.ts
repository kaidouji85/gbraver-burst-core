import {
  ArmdozerState,
  BatteryBoostSkill,
  EMPTY_ARMDOZER_STATE,
} from "../../../src";
import { calcBoostedBattery } from "../../../src/effect/pilot-skill/battery-boost";

/**
 * アームドーザ生成ヘルパー関数
 * @param battery 現在のバッテリー値
 * @returns 生成結果
 */
const createArmdozer = (battery: number): ArmdozerState => ({
  ...EMPTY_ARMDOZER_STATE,
  battery,
  maxBattery: 5,
});

/**
 * BatteryBoostSkill生成ヘルパー関数
 * @param recoverBattery バッテリー回復量
 * @returns 生成結果
 */
const createSkill = (recoverBattery: number): BatteryBoostSkill => ({
  type: "BatteryBoostSkill",
  recoverBattery,
});

test("バッテリー回復処理が正しく適用される", () => {
  const armdozer = createArmdozer(1);
  const skill = createSkill(3);
  expect(calcBoostedBattery(armdozer, skill)).toBe(4);
});

test("バッテリー最大値以上は回復しない", () => {
  const armdozer = createArmdozer(3);
  const skill = createSkill(5);
  expect(calcBoostedBattery(armdozer, skill)).toBe(5);
});
