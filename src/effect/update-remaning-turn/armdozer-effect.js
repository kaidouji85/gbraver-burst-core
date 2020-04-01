// @flow

import type {ArmdozerEffect} from "../..";

/**
 * アームドーザ効果の継続ターン数を更新する
 *
 * @param effect 更新前
 * @return 更新結果
 */
export function updateArmdozerEffect(effect: ArmdozerEffect): ArmdozerEffect {
  return {
    ...effect,
    remainingTurn: effect.remainingTurn - 1
  };
}

/**
 * アームドーザ効果が継続するか否かを判定する、trueで継続する
 *
 * @param effect 判定対象
 * @return 判定結果
 */
export function isRemainArmdozerEffect(effect: ArmdozerEffect): boolean {
  return 0 < effect.remainingTurn;
}