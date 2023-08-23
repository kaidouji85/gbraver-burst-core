import { z } from "zod";

/** 特殊な有効期限 */
export type SpecialPeriodEffect = Readonly<{
  type: "SpecialPeriod";
}>;

/** SpecialPeriodEffect zodスキーマ */
export const SpecialPeriodEffectSchema = z.object({
  type: z.literal("SpecialPeriod"),
});
