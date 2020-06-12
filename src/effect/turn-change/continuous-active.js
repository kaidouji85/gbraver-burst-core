// @flow

import type {ArmdozerEffect, PlayerState} from "../..";

/**
 * 指定したプレイヤーがアクティブプレイヤー継続を持っているか否かを判定する
 *
 * @param player 判定対象
 * @return 判定結果、trueでアクティブプレイヤー継続を持っている
 */
export function hasContinuousActivePlayer(player: PlayerState): boolean {
  return player.armdozer.effects
    .filter(v => v.type === 'ContinuousActivePlayer')
    .length > 0;
}

/**
 * アクティブプレイヤー継続を取り除く
 *
 * @param origin 処理対象
 * @return 処理結果
 */
export function removeContinuousActive(origin: ArmdozerEffect[]): ArmdozerEffect[] {
  const removeTarget = origin.find(v => v.type === 'ContinuousActivePlayer');
  if (!removeTarget) {
    return origin;
  }

  return origin.filter(v => v !== removeTarget);
}