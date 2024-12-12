import { Burst } from "../../player/burst";
import { batteryDrain } from "./battery-drain";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";
import { continuousAttack } from "./continuous-attack";
import { forceTurnEnd } from "./force-turn-skip";
import { lightningBarrier } from "./lightning-barrier";
import { recoverBattery } from "./recover-battery";

/**
 * バースト種別に応じた効果を適用する
 * @param params バースト発動情報
 * @returns バースト発動結果
 */
export function invokeBurst(
  params: BurstInvokeParams<Burst>,
): BurstInvokeResult {
  const { burst } = params;
  if (burst.type === "RecoverBattery") {
    return recoverBattery({ ...params, burst });
  }

  if (burst.type === "BuffPower") {
    return buffPower({ ...params, burst });
  }

  if (burst.type === "LightningBarrier") {
    return lightningBarrier({ ...params, burst });
  }

  if (burst.type === "ContinuousAttack") {
    return continuousAttack({ ...params, burst });
  }

  if (burst.type === "BatteryLimitBreak") {
    return batteryLimitBreak({ ...params, burst });
  }

  if (burst.type === "BatteryDrain") {
    return batteryDrain({ ...params, burst });
  }

  if (burst.type === "ForceTurnEnd") {
    return forceTurnEnd({ ...params, burst });
  }

  throw new Error("burst not found");
}
