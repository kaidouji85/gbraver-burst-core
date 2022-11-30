// @flow

import type { LightningBarrier } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト 電撃バリア
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function lightningBarrier(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: LightningBarrier
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === burstPlayerId
  );
  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
      effects: [
        ...burstPlayer.armdozer.effects,
        {
          type: "TryReflect",
          damage: burst.damage,
          effect: "Lightning",
          period: {
            type: "TurnLimit",
            remainingTurn: burst.duration,
          },
        },
      ],
    },
  };
  const updatedPlayers = lastState.players.map((player) =>
    player.playerId === burstPlayerId ? updatedBurstPlayer : player
  );
  const effect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect,
  };
}
