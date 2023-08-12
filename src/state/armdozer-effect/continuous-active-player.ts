import {EffectPeriod, EffectPeriodSchema} from "./effect-period";
import {z} from "zod";

/** アクティブプレイヤー継続 */
export type ContinuousActivePlayer = Readonly<{
  type: "ContinuousActivePlayer";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** ContinuousActivePlayer zodスキーマ */
export const ContinuousActivePlayerSchema = z.object({
  type: z.literal("ContinuousActivePlayer"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをContinuousActivePlayerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseContinuousActivePlayer = (
  origin: unknown,
): ContinuousActivePlayer | null => {
  const result = ContinuousActivePlayerSchema.safeParse(origin);
  return result.success ? result.data : null;
};