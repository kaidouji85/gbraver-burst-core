import { BatteryDrain } from "../../player/burst/battery-drain";
import { PlayerState } from "../../state/player-state";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト発動者のステートを更新する
 * @param invoker バースト発動者のステート
 * @param burst バースト情報
 * @return バースト発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  burst: BatteryDrain,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: burstRecoverBattery(invoker.armdozer, burst),
  },
});

/**
 * バースト発動していないプレイヤーのステートを更新する
 * @param invoker バースト発動していないプレイヤーのステート
 * @param burst バースト情報
 * @return バースト発動後のステート
 */
const updateOther = (other: PlayerState, burst: BatteryDrain): PlayerState => ({
  ...other,
  armdozer: {
    ...other.armdozer,
    effects: [
      ...other.armdozer.effects,
      {
        type: "BatteryCorrection",
        batteryCorrection: burst.batteryDecrease,
        period: {
          type: "TurnLimit",
          remainingTurn: 1,
        },
      },
    ],
  },
});

/**
 * バースト バッテリー減少 発動
 * @param params バースト発動情報
 * @return バースト発動結果
 */
export function batteryDrain(
  params: BurstInvokeParams<BatteryDrain>,
): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other: updateOther(other, burst),
  };
}
