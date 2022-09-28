// @flow
import type {ArmdozerEffect} from "../state/armdozer-effect";

/**
 * ダメージ半減効果を持つか否かを判定する
 * 
 * @param effect 判定対象となるアームドーザ効果 
 * @return 判定結果、trueでダメージ半減効果を持つ
 */
export function hasDamageHalved(effect: ArmdozerEffect[]): boolean {
  return effect.filter(v => v.type === 'DamageHalved')
    .length > 0;
}