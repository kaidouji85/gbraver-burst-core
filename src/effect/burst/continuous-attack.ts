import { ContinuousAttack } from "../../player/burst/continuous-attack";
import { PlayerState } from "../../state/player-state";
import { getRecoverBattery } from "../get-recover-battery";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";

/**
 * バースト発動者のステートを更新する
 * @param invoker バースト発動者のステート
 * @param burst バースト情報
 * @returns バースト発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  burst: ContinuousAttack,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: getRecoverBattery(invoker, burst.recoverBattery),
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
});

/**
 * バースト 連続攻撃 発動
 * @param params バースト発動情報
 * @returns バースト発動結果
 */
export function continuousAttack(
  params: BurstInvokeParams<ContinuousAttack>,
): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
