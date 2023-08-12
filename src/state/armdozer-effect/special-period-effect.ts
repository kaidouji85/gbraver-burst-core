import {z} from "zod";

/** 特殊な有効期限 */
export type SpecialPeriodEffect = Readonly<{
  type: "SpecialPeriod";
}>;

/** SpecialPeriodEffect zodスキーマ */
export const SpecialPeriodEffectSchema = z.object({
  type: z.literal("SpecialPeriod"),
});

/**
 * 任意オブジェクトをSpecialPeriodEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseSpecialPeriodEffect = (
  origin: unknown,
): SpecialPeriodEffect | null => {
  const result = SpecialPeriodEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
};