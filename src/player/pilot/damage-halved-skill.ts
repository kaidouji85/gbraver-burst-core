import { z } from "zod";

/** ダメージ半減スキル */
export type DamageHalvedSkill = Readonly<{
  type: "DamageHalvedSkill";
  /** 継続ターン数 */
  duration: number;
}>;

/** DamageHalvedSkill zodスキーマ */
export const DamageHalvedSkillSchema = z.object({
  type: z.literal("DamageHalvedSkill"),
  duration: z.number(),
});
