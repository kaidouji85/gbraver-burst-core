// @flow

import type {PlayerState} from "../../game-state/player-state";

/**
 * 戦闘による死亡判定を行う
 *
 * @param defender 防御側のステータス
 * @return 判定結果、trueで死亡
 */
export function isDeath(defender: PlayerState): boolean {
  return defender.armdozer.hp <= 0;
}