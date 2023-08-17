import { PlayerState } from "./player-state";

/**
 * プレイヤーの死亡判定を行う
 * @param defender 防御側のステータス
 * @return 判定結果、trueで死亡
 */
export function isPlayerDeath(defender: PlayerState): boolean {
  return defender.armdozer.hp <= 0;
}