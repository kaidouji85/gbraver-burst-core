// @flow

import type {PlayerState} from "../../state/player-state";
import type {RecoverBattery} from "../../player/burst";
import {burstRecoverBattery} from "./burst-recover-battery";
import type {GameState, GameStateX} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {BurstEffect} from "./burst-effect";

/**
 * バースト バッテリー回復
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果、実行不可能な場合はnullを返す
 */
export function recoverBattery(lastState: GameState, burstPlayerId: PlayerId, burst: RecoverBattery): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    throw new Error('not found burst player');
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
    }
  };
  const updatedPlayers = lastState.players
    .map(player => player.playerId === burstPlayerId ? updatedBurstPlayer : player);
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