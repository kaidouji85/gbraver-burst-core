import { BuffPower } from "../../player/burst/buff-power";
import { BurstInvoke, BurstInvokeResult } from "./burst-invoke";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト 攻撃アップ 発動
 * @param params バースト発動情報
 * @return バースト発動結果
 */
export function buffPower(params: BurstInvoke<BuffPower>): BurstInvokeResult {
  const { invoker, other, burst } = params;
  return {
    invoker: {
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
    },
    other,
  };
}
