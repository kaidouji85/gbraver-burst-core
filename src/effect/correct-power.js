// @flow

import type {ArmdozerEffect} from "../state/armdozer-effect";

/**
 * 攻撃補正を計算する
 *
 * @param effects アームドーザ効果
 * @return 計算結果
 */
export function correctPower(effects: ArmdozerEffect[]): number {
  const total = totalCorrectPower(effects);
  const coefficient = hasHalveCorrectPower(effects) ? 0.5 : 1;
  return total * coefficient;
}

/**
 * 攻撃補正半減を持つか否かを判定する
 *
 * @param effects 攻撃側のアームドーザ効果
 * @return 判定結果、trueで攻撃補正半減を持つ
 */
export function hasHalveCorrectPower(effects: ArmdozerEffect[]): boolean {
  return effects.filter(v => v.type === 'HalveCorrectPower')
    .length > 0;
}

/**
 * アームドーザ効果から攻撃補正の合計値を計算する
 *
 * @param effects 攻撃側のアームドーザ効果
 * @return 計算結果
 */
export function totalCorrectPower(effects: ArmdozerEffect[]): number {
  return effects
    .map(v => (v.type === 'CorrectPower') ? v.power : 0)
    .reduce((a, b) => a + b, 0);
}
