// @flow

import type {PlayerId, PlayerBattleState} from '../flow-type';

/**
 * 先行ターンのプレイヤーを判定する
 * 素早さが同じ場合はランダムに先行プレイヤーが決定される
 *
 * @param player1 1人目プレイヤーの状態
 * @param player2 2人目プレイヤーの状態
 * @return 先行プレイヤーのID
 */
export function getFirstTurnPlayer(player1: PlayerBattleState, player2: PlayerBattleState): PlayerId {
  if (player2.armDozer.speed < player1.armDozer.speed) {
    return player1.playerId;
  }

  if (player1.armDozer.speed < player2.armDozer.speed) {
    return player2.playerId;
  }

  return randomPlayerId(player1.playerId, player2.playerId);
}

/**
 * 先行プレイヤーIDをランダムに決める
 *
 * @param player1
 * @param player2
 */
function randomPlayerId(playerId1: PlayerId, playerId2: PlayerId): PlayerId {
  const MAX_VALUE = 1000;
  const value = Math.floor(Math.random() * MAX_VALUE);
  return value <= MAX_VALUE / 2 ? playerId1 : playerId2;
}