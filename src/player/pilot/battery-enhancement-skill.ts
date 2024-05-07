import { z } from "zod";

/** バッテリー増強スキル */
export type BatteryEnhancementSkill = Readonly<{
  type: "BatteryEnhancementSkill";
  /** バッテリー増強値 */
  batteryEnhancement: number;
  /** 継続ターン数 */
  duration: number;
}>;

/** BatteryEnhancementSkill zodスキーマ */
export const BatteryEnhancementSkillSchema = z.object({
  type: z.literal("BatteryEnhancementSkill"),
  batteryEnhancement: z.number(),
  duration: z.number(),
});
