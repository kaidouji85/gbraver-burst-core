// @flow

import type {GameState, PlayerId} from "../..";
import type {ContinuousAttack} from "../../player/burst";

/**
 * 連続攻撃
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 */
export function continuousAttack(lastState: GameState, burstPlayerId: PlayerId, burst: ContinuousAttack): GameState {
  return lastState;
}