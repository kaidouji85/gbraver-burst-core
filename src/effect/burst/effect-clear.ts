import { EffectClear } from "../../player/burst/effect-clear";
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
  burst: EffectClear,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: getRecoverBattery(invoker, burst.recoverBattery),
  },
});

/**
 * それ以外のプレイヤーのステートを更新する
 * @param other それ以外のプレイヤーのステート
 * @returns バースト発動後のステート
 */
const updateOther = (other: PlayerState): PlayerState => ({
  ...other,
  armdozer: {
    ...other.armdozer,
    effects: [],
  },
});

/**
 * バースト 効果クリア 発動
 * @param params バースト発動情報
 * @returns バースト発動結果
 */
export function effectClear(
  params: BurstInvokeParams<EffectClear>,
): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other: updateOther(other),
  };
}
