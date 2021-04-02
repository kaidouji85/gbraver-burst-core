// @flow

import type {ContinuousAttack} from "../../player/burst";
import {burstRecoverBattery} from "./burst-recover-battery";
import type {GameState, GameStateX} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {BurstEffect} from "./burst-effect";
import type {PlayerState} from "../../state/player-state";

/**
 * 連続攻撃
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 */
export function continuousAttack(lastState: GameState, burstPlayerId: PlayerId, burst: ContinuousAttack): ?GameStateX<BurstEffect> {
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
          type: 'ContinuousActivePlayer',
          remainingTurn: Infinity
        }
      ]
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