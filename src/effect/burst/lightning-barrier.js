// @flow

import type {LightningBarrier} from '../../player/burst';
import type {PlayerState} from '../../game/state/player-state';
import {burstRecoverBattery} from "./burst-recover-battery";
import type {BurstEffect, GameState, GameStateX, PlayerId} from "../..";

/**
 * バースト 電撃バリア
 *
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function lightningBarrier(lastState: GameState, burstPlayerId: PlayerId, burst: LightningBarrier): ?GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return null;
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
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
  const effect = {
    name: 'BurstEffect',
    burstPlayer: burstPlayerId,
    burst: burst,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}
