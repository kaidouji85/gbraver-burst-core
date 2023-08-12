import { z } from "zod";

/** パイロットスキル 攻撃バフ */
export type BuffPowerSkill = Readonly<{
  type: "BuffPowerSkill";
  /** 攻撃力アップ */
  buffPower: number;
  /** バフ継続ターン数 */
  duration: number;
}>;

/** BuffPowerSkill zodスキーマ */
export const BuffPowerSkillSchema = z.object({
  type: z.literal("BuffPowerSkill"),
  buffPower: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBuffPowerSkillにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBuffPowerSkill = (origin: unknown): BuffPowerSkill | null => {
  const result = BuffPowerSkillSchema.safeParse(origin);
  return result.success ? result.data : null;
};
