import type { PlayerId } from "../../player/player";
import type { PlayerState } from "../../state/player-state";

/**
 * 先行ターンのプレイヤーを判定する
 * 素早さが同じ場合はランダムに先行プレイヤーが決定される
 * @param player1 1人目プレイヤーの状態
 * @param player2 2人目プレイヤーの状態
 * @return 先行プレイヤーのID
 */
export function getFirstTurnPlayer(
  player1: PlayerState,
  player2: PlayerState,
): PlayerId {
  if (player1.armdozer.speed === player2.armdozer.speed) {
    return Math.random() < 0.5 ? player1.playerId : player2.playerId;
  }

  const isPlayer1Faster = player2.armdozer.speed < player1.armdozer.speed;
  return isPlayer1Faster ? player1.playerId : player2.playerId;
}
