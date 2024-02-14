import { RecoverBattery } from "../../player/burst/recover-battery";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { burstRecoverBattery } from "./burst-recover-battery";

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
