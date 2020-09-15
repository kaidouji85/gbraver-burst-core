// @flow

import type {ArmdozerEffect} from "../../../state/armdozer-effect";

/**
 * 攻撃力補正を計算して返す
 *
 * @param effects 攻撃側のアームドーザ効果
 * @return 攻撃力補正
 */
export function correctPower(effects: ArmdozerEffect[],): number {
  return effects
    .map(v => v.type === 'CorrectPower'
      ? v.power
      : 0
    ).reduce((a, b) => a + b, 0);
}
