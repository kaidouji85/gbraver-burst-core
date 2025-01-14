import { Burst } from "../../player/burst";
import { batteryDrain } from "./battery-drain";
import { batteryLimitBreak } from "./battery-limit-break";
import { buffPower } from "./buff-power";
import { BurstInvokeParams } from "./burst-invoke-params";
import { BurstInvokeResult } from "./burst-invoke-result";
import { continuousAttack } from "./continuous-attack";
import { forceTurnEnd } from "./force-turn-skip";
import { ineffective } from "./ineffective";
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
  switch (burst.type) {
    case "RecoverBattery":
      return recoverBattery({ ...params, burst });
    case "BuffPower":
      return buffPower({ ...params, burst });
    case "LightningBarrier":
      return lightningBarrier({ ...params, burst });
    case "ContinuousAttack":
      return continuousAttack({ ...params, burst });
    case "BatteryLimitBreak":
      return batteryLimitBreak({ ...params, burst });
    case "BatteryDrain":
      return batteryDrain({ ...params, burst });
    case "ForceTurnEnd":
      return forceTurnEnd({ ...params, burst });
    case "Ineffective":
      return ineffective({ ...params, burst });
    default:
      throw new Error("burst not found");
  }
}
