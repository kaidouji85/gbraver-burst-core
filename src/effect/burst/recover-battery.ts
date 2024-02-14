import { RecoverBattery } from "../../player/burst/recover-battery";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * @deprecated
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
 * @deprecated
 * バースト バッテリー回復
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果
 */
export function deprecatedRecoverBattery(
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

/**
 * バースト バッテリー回復 を発動する
 * @param params パラメータ
 * @return バースト発動結果
 */
export function recoverBattery(
  params: BurstInvoke<RecoverBattery>,
): BurstInvokeResult {
  const { burst, invoker, other } = params;
  return {
    invoker: {
      ...invoker,
      armdozer: {
        ...invoker.armdozer,
        battery: burstRecoverBattery(invoker.armdozer, burst),
      },
    },
    other,
  };
}
