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

/**
 * 任意オブジェクトをRecoverBatterySkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseRecoverBatterySkill = (
  origin: unknown,
): RecoverBatterySkill | null => {
  const result = RecoverBatterySkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};
