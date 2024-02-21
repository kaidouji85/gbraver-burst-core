import { BatteryBoostSkill } from "../../player/pilot/battery-boost-skill";
import { BatteryEnchantmentSkill } from "../../player/pilot/battery-enchantment-skill";
import { BuffPowerSkill } from "../../player/pilot/buff-power-skill";
import { DamageHalvedSkill } from "../../player/pilot/damage-halved-skill";
import { PilotSkill } from "../../player/pilot/pilot-skill";
import { RecoverBatterySkill } from "../../player/pilot/recover-battery-skill";
import { batteryBoost } from "./battery-boost";
import { batteryEnchantment } from "./battery-enchantment";
import { buffPower } from "./buff-power";
import { damageHalvedSkill } from "./damage-halved-skill";
import { PilotSkillInvokeParams } from "./pilot-skill-invoke-params";
import { PilotSkillInvokeResult } from "./pilot-skill-invoke-result";
import { recoverBattery } from "./recover-battery";

/**
 * パイロットスキル種別に応じた効果を適用する
 * @param params パイロットスキル発動情報
 * @return パイロットスキル発動結果
 */
export function invokePilotSkill(
  params: PilotSkillInvokeParams<PilotSkill>,
): PilotSkillInvokeResult {
  if (params.skill.type === "RecoverBatterySkill") {
    const skill: RecoverBatterySkill = params.skill;
    return recoverBattery({ ...params, skill });
  }

  if (params.skill.type === "BatteryBoostSkill") {
    const skill: BatteryBoostSkill = params.skill;
    return batteryBoost({ ...params, skill });
  }

  if (params.skill.type === "BuffPowerSkill") {
    const skill: BuffPowerSkill = params.skill;
    return buffPower({ ...params, skill });
  }

  if (params.skill.type === "BatteryEnchantmentSkill") {
    const skill: BatteryEnchantmentSkill = params.skill;
    return batteryEnchantment({ ...params, skill });
  }

  if (params.skill.type === "DamageHalvedSkill") {
    const skill: DamageHalvedSkill = params.skill;
    return damageHalvedSkill({ ...params, skill });
  }

  throw new Error("pilotSkill not found");
}
