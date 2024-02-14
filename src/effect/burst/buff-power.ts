import { BuffPower } from "../../player/burst/buff-power";
import { PlayerState } from "../../state/player-state";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト発動者のステートを更新する
 * @param invoker バースト発動者のステート
 * @param burst バースト情報
 * @return バースト発動後のステート
 */
const updateInvoker = (
  invoker: PlayerState,
  burst: BuffPower,
): PlayerState => ({
  ...invoker,
  armdozer: {
    ...invoker.armdozer,
    battery: burstRecoverBattery(invoker.armdozer, burst),
    effects: [
      ...invoker.armdozer.effects,
      {
        type: "CorrectPower",
        power: burst.buffPower,
        period: {
          type: "TurnLimit",
          remainingTurn: burst.duration,
        },
      },
    ],
  },
});

/**
 * バースト 攻撃アップ 発動
 * @param params バースト発動情報
 * @return バースト発動結果
 */
export function buffPower(params: BurstInvoke<BuffPower>): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: updateInvoker(invoker, burst),
    other,
  };
}
