import { RecoverBattery } from "../../player/burst/recover-battery";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バッテリー回復を適用する
 * @param invoker バースト発動者
 * @param burst バースト内容
 * @return 発動後のステート
 */
function invokeRecoverBattery(
  invoker: PlayerState,
  burst: RecoverBattery,
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      battery: burstRecoverBattery(invoker.armdozer, burst),
    },
  };
}

/**
 * バースト バッテリー回復
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果
 */
export function recoverBattery(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: RecoverBattery,
): GameStateX<BurstEffect> {
  const players = lastState.players.map((player) =>
    player.playerId === burstPlayerId
      ? invokeRecoverBattery(player, burst)
      : player,
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players, effect };
}
