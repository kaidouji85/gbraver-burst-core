// @flow
import type {ArmdozerEffect} from "../state/armdozer-effect";

/**
 * アームドーザ効果からダメージ減少値の合計を計算する
 *
 * @param effects アームドーザ効果
 * @return ダメージ減少値
 */
export function totalDamageDecrease(effects: ArmdozerEffect[]): number {
  return effects
    .map(v => (v.type === 'DamageDecrease') ? v.decrease : 0)
    .reduce((a, b) => a + b, 0);
}