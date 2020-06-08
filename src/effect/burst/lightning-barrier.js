// @flow

import type {LightningBarrier} from '../../player/armdozer/burst';
import type {PlayerState} from '../../state/player-state';
import {burstRecoverBattery} from "./burst-recover-battery";
import type {GameState, PlayerId} from "../..";

/**
 * バースト 電撃バリア
 *
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果
 */
export function lightningBarrier(lastState: GameState, burstPlayerId: PlayerId, burst: LightningBarrier): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      enableBurst: false,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
      effects: [
        ...burstPlayer.armdozer.effects,
        {
          type: 'TryReflect',
          damage: burst.damage,
          effect: 'Lightning',
          remainingTurn: burst.duration
        }
      ]
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
