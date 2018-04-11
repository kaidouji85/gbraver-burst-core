// @flow

import type {PlayerState} from '../../player/player-state';
import type {PlayerId} from "../../player/player-state";

/**
 * 先行ターンのプレイヤーを判定する
 * 素早さが同じ場合はランダムに先行プレイヤーが決定される
 *
 * @param player1 1人目プレイヤーの状態
 * @param player2 2人目プレイヤーの状態
 * @return 先行プレイヤーのID
 */
export function getFirstTurnPlayer(player1: PlayerState, player2: PlayerState): PlayerId {
  if (player1.armDozer.speed === player2.armDozer.speed) {
    return randomPlayerId(player1.playerId, player2.playerId);
  }

  const isPlayer1Faster = player2.armDozer.speed < player1.armDozer.speed;
  return isPlayer1Faster ? player1.playerId : player2.playerId;
}

/**
 * 先行プレイヤーIDをランダムに決める
 *
 * @param player1
 * @param player2
 * @param 先行となるプレイヤーID
 */
function randomPlayerId(playerId1: PlayerId, playerId2: PlayerId): PlayerId {
  const MAX_VALUE = 1000;
  const value = Math.floor(Math.random() * MAX_VALUE);
  return value <= MAX_VALUE / 2 ? playerId1 : playerId2;
}
