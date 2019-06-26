// @flow

import type {PlayerState} from "../../../game-state/player-state";

/**
 * アームドーザの基礎攻撃力を計算する
 *
 * @param attacker 攻撃側プレイヤー
 * @return 基礎攻撃力
 */
export function power(attacker: PlayerState): number {
  const correct = attacker.armdozer.effects
    .filter(v => v.type === 'CorrectPower')
    .map(v => v.power)
    .reduce((a, b) => a + b, 0);
  return attacker.armdozer.power + correct;
}