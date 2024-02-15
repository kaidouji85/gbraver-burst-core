import { Burst } from "../../player/burst";
import { BatteryLimitBreak } from "../../player/burst/battery-limit-break";
import { BuffPower } from "../../player/burst/buff-power";
import { ContinuousAttack } from "../../player/burst/continuous-attack";
import { LightningBarrier } from "../../player/burst/lightning-barrier";
import { RecoverBattery } from "../../player/burst/recover-battery";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";
import { continuousAttack } from "./continuous-attack";
import { lightningBarrier } from "./lightning-barrier";
import { recoverBattery } from "./recover-battery";

/**
 * バースト種別に応じた効果を適用する
 * @param params バースト発動情報
 * @return バースト発動結果
 */
export function invokeBurst(
  params: BurstInvokeParams<Burst>,
): BurstInvokeResult {
  if (params.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = params.burst;
    return recoverBattery({ ...params, burst });
  }

  if (params.burst.type === "BuffPower") {
    const burst: BuffPower = params.burst;
    return buffPower({ ...params, burst });
  }

  if (params.burst.type === "LightningBarrier") {
    const burst: LightningBarrier = params.burst;
    return lightningBarrier({ ...params, burst });
  }

  if (params.burst.type === "ContinuousAttack") {
    const burst: ContinuousAttack = params.burst;
    return continuousAttack({ ...params, burst });
  }

  if (params.burst.type === "BatteryLimitBreak") {
    const burst: BatteryLimitBreak = params.burst;
    return batteryLimitBreak({ ...params, burst });
  }

  throw new Error("burst not found");
}
