import { ForceTurnEnd } from "../../player/burst/force-turn-end";
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
  burst: ForceTurnEnd,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: getRecoverBattery(invoker, burst.recoverBattery),
  },
});

/**
 * バースト ターン強制終了 を発動する
 * @param params パラメータ
 * @returns バースト発動結果
 */
export function forceTurnEnd(
  params: BurstInvokeParams<ForceTurnEnd>,
): BurstInvokeResult {
  const { burst, invoker, other } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
