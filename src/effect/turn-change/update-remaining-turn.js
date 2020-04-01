// @flow

import type {ArmdozerEffect} from "../../state/armdozer-effect";

// TODO 削除する
/**
 * アームドーザ効果の継続ターンを更新する
 * 残りターンが0になったものはリストから外す
 *
 * @param effects 更新前のアームドーザ効果
 * @return 更新結果
 */
export function updateRemainingTurn(effects: ArmdozerEffect[]): ArmdozerEffect[] {
  return effects
    .map(v => ({...v, remainingTurn: v.remainingTurn - 1}))
    .filter(v => (0 < v.remainingTurn));
}
