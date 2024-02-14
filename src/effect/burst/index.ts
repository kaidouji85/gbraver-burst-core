import { Burst } from "../../player/burst";
import { BatteryLimitBreak } from "../../player/burst/battery-limit-break";
import { BuffPower } from "../../player/burst/buff-power";
import { ContinuousAttack } from "../../player/burst/continuous-attack";
import { LightningBarrier } from "../../player/burst/lightning-barrier";
import { RecoverBattery } from "../../player/burst/recover-battery";
import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { PlayerState } from "../../state/player-state";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import { BurstEffect } from "./burst-effect";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { continuousAttack } from "./continuous-attack";
import { lightningBarrier } from "./lightning-barrier";
import { recoverBattery } from "./recover-battery";

/**
 * バースト種別に応じた効果を適用する
 * @param params バースト発動情報
 * @return バースト発動結果
 */
function invokeBurst(params: BurstInvoke<Burst>): BurstInvokeResult {
  if (params.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = params.burst;
    return recoverBattery({ ...params, burst });
  }

  if (params.burst.type === "BuffPower") {
    const burst: BuffPower = params.burst;
    return buffPower({ ...params, burst });
  }

  if (params.burst.type === "LightningBarrier") {
    const burst: LightningBarrier = params.burst;
    return lightningBarrier({ ...params, burst });
  }

  if (params.burst.type === "ContinuousAttack") {
    const burst: ContinuousAttack = params.burst;
    return continuousAttack({ ...params, burst });
  }

  if (params.burst.type === "BatteryLimitBreak") {
    const burst: BatteryLimitBreak = params.burst;
    return batteryLimitBreak({ ...params, burst });
  }

  throw new Error("burst not found");
}

/**
 * 発動者がバーストを発動できない状態にする
 * @param invoker バースト発動者
 * @return ステート更新結果
 */
function disableInvokerBurst(
  invoker: PlayerState
): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      enableBurst: false,
    },
  };
}

/**
 * バーストを実行する
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(
  lastState: GameState,
  burstPlayerId: PlayerId,
): GameStateX<BurstEffect> {
  const invoker = lastState.players.find((v) => v.playerId === burstPlayerId);
  const other = lastState.players.find((v) => v.playerId !== burstPlayerId);
  if (!invoker || !other) {
    throw new Error("invalid burst player id");
  }

  const burst = invoker.armdozer.burst;
  const result = invokeBurst({ burst, invoker, other });
  const updatedInvoker = disableInvokerBurst(result.invoker);
  const updatedOther = result.other;
  const players = lastState.players.map((v) =>
    v.playerId === burstPlayerId ? updatedInvoker : updatedOther,
  );
  return {
    ...lastState,
    players,
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayerId,
      burst,
    },
  };
}
