import type { PlayerId } from "../../player/player";
import type { PlayerState } from "../../state/player-state";

/**
 * 先行ターンのプレイヤーを判定する
 * 素早さが同じ場合は、以下のようにランダムで先行プレイヤーが決定される
 *
 * ランダム値 0.5未満 -> プレイヤー1が先行
 * ランダム値 0.5以上 -> プレイヤー2が先行
 *
 * @param player1 1人目プレイヤーの状態
 * @param player2 2人目プレイヤーの状態
 * @param random 0から1未満で指定するランダム値
 * @return 先行プレイヤーのID
 */
export function getFirstTurnPlayer(
  player1: PlayerState,
  player2: PlayerState,
  random: number,
): PlayerId {
  if (player1.armdozer.speed === player2.armdozer.speed) {
    return random < 0.5 ? player1.playerId : player2.playerId;
  }

  const isPlayer1Faster = player2.armdozer.speed < player1.armdozer.speed;
  return isPlayer1Faster ? player1.playerId : player2.playerId;
}
