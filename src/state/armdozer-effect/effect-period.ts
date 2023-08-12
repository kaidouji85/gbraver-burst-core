import {z} from "zod";
import {TurnLimitEffect, TurnLimitEffectSchema} from "./turn-limit-effect";
import {SpecialPeriodEffect, SpecialPeriodEffectSchema} from "./special-period-effect";

/** エフェクト有効期間 */
export type EffectPeriod = TurnLimitEffect | SpecialPeriodEffect;

/** EffectPeriod zodスキーマ */
export const EffectPeriodSchema = z.union([
  TurnLimitEffectSchema,
  SpecialPeriodEffectSchema,
]);

/**
 * 任意オブジェクトをEffectPeriodにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseEffectPeriod = (origin: unknown): EffectPeriod | null => {
  const result = EffectPeriodSchema.safeParse(origin);
  return result.success ? result.data : null;
};