// @flow

import type {GameState, PlayerId} from "../..";

/**
 * パイロットスキルを発動する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId パイロットスキルを利用するプレイヤー
 * @return 更新結果
 */
export function pilotSkill(lastState: GameState, burstPlayerId: PlayerId): GameState {
  return lastState;
}
