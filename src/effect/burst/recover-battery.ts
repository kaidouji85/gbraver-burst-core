import { RecoverBattery } from "../../player/burst/recover-battery";
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
  burst: RecoverBattery,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: getRecoverBattery(invoker, burst.recoverBattery),
    effects: [
      ...invoker.armdozer.effects,
      {
        type: "TurnStartBatteryCorrect",
        correctBattery: burst.turnStartBatteryCorrect,
        period: {
          type: "SpecialPeriod",
        },
      },
    ],
  },
});

/**
 * バースト バッテリー回復 を発動する
 * @param params パラメータ
 * @returns バースト発動結果
 */
export function recoverBattery(
  params: BurstInvokeParams<RecoverBattery>,
): BurstInvokeResult {
  const { burst, invoker, other } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
