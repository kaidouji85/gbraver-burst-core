import type { LightningBarrier } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * 電撃バリアを適用する
 * @param invoker バースト発動者
 * @param burst バースト内容
 * @return 発動後のステート
 */
function invokeLightningBarrier(
  invoker: PlayerState,
  burst: LightningBarrier,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: burstRecoverBattery(invoker.armdozer, burst),
      effects: [
        ...invoker.armdozer.effects,
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
  }
}

/**
 * バースト 電撃バリア
 * @param lastState 最新状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果
 */
export function lightningBarrier(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: LightningBarrier,
): GameStateX<BurstEffect> {
  const players = lastState.players.map((player) =>
    player.playerId === burstPlayerId ? invokeLightningBarrier(player, burst) : player,
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players, effect };
}
