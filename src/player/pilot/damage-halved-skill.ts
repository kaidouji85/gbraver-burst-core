import {z} from "zod";

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

/**
 * 任意オブジェクトをDamageHalvedSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseDamageHalvedSkill = (
  origin: unknown,
): DamageHalvedSkill | null => {
  const result = DamageHalvedSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};