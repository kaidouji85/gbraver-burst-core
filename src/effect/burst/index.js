// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerId} from "../../player/player";
import {updateForBurst} from "./update-for-burst";

/**
 * バーストを実施する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト実施後の状態
 */
export function doBurst(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  const otherPlayer = lastState.players.find(v => v.playerId !== burstPlayerId);
  if (!burstPlayer || !otherPlayer) {
    return lastState;
  }

  return {
    ...lastState,
    players: updateForBurst(burstPlayer, otherPlayer)
  };
}
