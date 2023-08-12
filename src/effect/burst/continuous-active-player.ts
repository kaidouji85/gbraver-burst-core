import type { ContinuousAttack } from "../../player/burst/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * アクティブプレイヤー継続を適用する
 * @param invoker バースト発動者
 * @param burst バースト内容
 * @return 発動後のステート
 */
function invokeContinuousActivePlayer(
  invoker: PlayerState,
  burst: ContinuousAttack,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: burstRecoverBattery(invoker.armdozer, burst),
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "ContinuousActivePlayer",
          period: {
            type: "SpecialPeriod",
          },
        },
      ],
    },
  };
}

/**
 * アクティブプレイヤー継続
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果
 */
export function continuousActivePlayer(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: ContinuousAttack,
): GameStateX<BurstEffect> {
  const players = lastState.players.map((player) =>
    player.playerId === burstPlayerId
      ? invokeContinuousActivePlayer(player, burst)
      : player,
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players, effect };
}
