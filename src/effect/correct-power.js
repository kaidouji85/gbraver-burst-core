// @flow

import type {ArmdozerEffect} from "../state/armdozer-effect";

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
