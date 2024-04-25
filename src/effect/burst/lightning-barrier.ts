import { LightningBarrier } from "../../player/burst/lightning-barrier";
import { PlayerState } from "../../state/player-state";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト発動者のステートを更新する
 * @param invoker バースト発動者のステート
 * @param burst バースト情報
 * @returns バースト発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  burst: LightningBarrier,
): PlayerState => ({
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
});

/**
 * バースト 電撃バリア 発動
 * @param params バースト発動情報
 * @returns バースト発動結果
 */
export function lightningBarrier(
  params: BurstInvokeParams<LightningBarrier>,
): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
