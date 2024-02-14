import { RecoverBattery } from "../../player/burst/recover-battery";
import { PlayerState } from "../../state/player-state";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト発動者のステートを更新する
 * @param invoker バースト発動者のステート
 * @param burst バースト情報
 * @return バースト発動後のステート
 */
const updateInvoker = (invoker: PlayerState, burst: RecoverBattery) => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: burstRecoverBattery(invoker.armdozer, burst),
  },
});

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
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
