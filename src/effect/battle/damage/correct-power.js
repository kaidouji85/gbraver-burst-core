// @flow

import type {ArmdozerEffect} from "../../../game-state/armdozer/armdozer-effect";

/**
 * 攻撃力補正を計算して返す
 *
 * @param effects 攻撃側のアームドーザ効果
 * @return 攻撃力補正
 */
export function correctPower(effects: ArmdozerEffect[],): number {
  return effects
    .filter(v => v.type === 'CorrectPower')
    .map(v => v.power)
    .reduce((a, b) => a + b, 0);
}
