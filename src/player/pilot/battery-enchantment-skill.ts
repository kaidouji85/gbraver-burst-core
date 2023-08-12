import {z} from "zod";

/** バッテリー増強スキル */
export type BatteryEnchantmentSkill = Readonly<{
  type: "BatteryEnchantmentSkill";
  /** バッテリー増強値 */
  batteryEnchantment: number;
  /** 継続ターン数 */
  duration: number;
}>;

/** BatteryEnchantmentSkill zodスキーマ */
export const BatteryEnchantmentSkillSchema = z.object({
  type: z.literal("BatteryEnchantmentSkill"),
  batteryEnchantment: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBatteryEnchantmentSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryEnchantmentSkill = (
  origin: unknown,
): BatteryEnchantmentSkill | null => {
  const result = BatteryEnchantmentSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};