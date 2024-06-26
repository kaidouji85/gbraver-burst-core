import { BatteryLimitBreak } from "../../player/burst/battery-limit-break";
import { ArmdozerState } from "../../state/armdozer-state";
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
function updateInvoker(
  invoker: PlayerState,
  burst: BatteryLimitBreak,
): PlayerState {
  const updatedArmdozer: ArmdozerState = {
    ...invoker.armdozer,
    maxBattery: burst.maxBattery,
  };
  return {
    ...invoker,
    armdozer: {
      ...updatedArmdozer,
      battery: getRecoverBattery(
        { ...invoker, armdozer: updatedArmdozer },
        burst.recoverBattery,
      ),
    },
  };
}

/**
 * バースト バッテリーリミットブレイク 発動
 * @param params バースト発動情報
 * @returns バースト発動結果
 */
export function batteryLimitBreak(
  params: BurstInvokeParams<BatteryLimitBreak>,
): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
