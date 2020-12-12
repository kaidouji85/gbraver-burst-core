// @flow

import type {ArmdozerEffect} from "../../..";

/**
 * 防御側のアームドーザ効果からダメージ減少値を計算する
 *
 * @param defenderEffects 防御側のアームドーザ効果
 * @return ダメージ減少値
 */
export function damageDecrease(defenderEffects: ArmdozerEffect[]): number {
  return defenderEffects
    .map(v => (v.type === 'DamageDecrease') ? v.decrease : 0)
    .reduce((a, b) => a + b, 0);
}