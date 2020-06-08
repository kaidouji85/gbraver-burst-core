// @flow

import type {PlayerState} from "../../game/state/player-state";
import type {RecoverBattery} from "../../player/burst";
import {burstRecoverBattery} from "./burst-recover-battery";
import type {GameState, PlayerId} from "../..";

/**
 * バースト バッテリー回復
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果
 */
export function recoverBattery(lastState: GameState, burstPlayerId: PlayerId, burst: RecoverBattery): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
    }
  };
  const updatedPlayers = lastState.players.map(player => player.playerId === burstPlayerId
    ? updatedBurstPlayer
    : player
  );

  return {
    ...lastState,
    players: updatedPlayers,
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayerId,
      burst: burst,
    }
  };
}