import type { BuffPower } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * 攻撃アップを適用する
 * @param invoker バースト発動者
 * @param burst バースト内容
 * @return 発動後のステート
 */
function invokeBuffPower(invoker: PlayerState, burst: BuffPower): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: burstRecoverBattery(invoker.armdozer, burst),
      effects: [
        ...invoker.armdozer.effects,
        {
          type: "CorrectPower",
          power: burst.buffPower,
          period: {
            type: "TurnLimit",
            remainingTurn: burst.duration,
          },
        },
      ],
    },
  };
}

/**
 * バースト 攻撃力アップ
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果
 */
export function buffPower(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: BuffPower,
): GameStateX<BurstEffect> {
  const players = lastState.players.map((player) =>
    player.playerId === burstPlayerId ? invokeBuffPower(player, burst) : player,
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players, effect };
}
