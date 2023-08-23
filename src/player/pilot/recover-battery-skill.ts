import { z } from "zod";

/** パイロットスキル バッテリー回復 */
export type RecoverBatterySkill = Readonly<{
  type: "RecoverBatterySkill";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** RecoverBatterySkill zodスキーマ */
export const RecoverBatterySkillSchema = z.object({
  type: z.literal("RecoverBatterySkill"),
  recoverBattery: z.number(),
});
