import { z } from "zod";

/**
 * バッテリーブーストスキル
 * バッテリーを大幅回復できるが、次の自分ターン開始時のバッテリー回復がスキップされる
 */
export type BatteryBoostSkill = Readonly<{
  type: "BatteryBoostSkill";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** BatteryBoostSkill zodスキーマ */
export const BatteryBoostSkillSchema = z.object({
  type: z.literal("BatteryBoostSkill"),
  recoverBattery: z.number(),
});
