// @flow

import type {ArmdozerState, ArmdozerStateX, Burst, GameState, PlayerId, PlayerState} from "../..";
import type {SkipTurn} from "../../player/armdozer/burst";
import {getBurstRecoverBattery} from "./get-burst-recover-battery";

/**
 * スキップターンの処理
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤー
 * @param skipTurn スキップターンの内容
 * @return 更新結果
 */
export function skipTurn(lastState: GameState, burstPlayerId: PlayerId, skipTurn: SkipTurn): GameState {
  const burstPlayer = lastState.players.find(player => player.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const castedBurstArmdozer: ArmdozerState = ((burstPlayer.armdozer: any): ArmdozerStateX<Burst | typeof burstPlayer.armdozer.burst>);
  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: getBurstRecoverBattery(castedBurstArmdozer)
    }
  };
  const updatedPlayers: PlayerState[] = lastState.players
    .map(player => player.playerId === updatedBurstPlayer.playerId
      ? updatedBurstPlayer
      : player
    );

  return {
    ...lastState,
    activePlayerId: burstPlayer.playerId,
    players: updatedPlayers,
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayer.playerId,
      burst: skipTurn,
    }
  }
}