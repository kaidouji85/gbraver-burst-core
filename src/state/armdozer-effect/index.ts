import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

/** ターン開始時のバッテリー回復をスキップ */
export type BatteryRecoverSkip = Readonly<{
  type: "BatteryRecoverSkip";
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** BatteryRecoverSkip zodスキーマ */
export const BatteryRecoverSkipSchema = z.object({
  type: z.literal("BatteryRecoverSkip"),
  period: EffectPeriodSchema,
});

/**
 * 任意オブジェクトをBatteryRecoverSkipにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBatteryRecoverSkip = (
  origin: unknown,
): BatteryRecoverSkip | null => {
  const result = BatteryRecoverSkipSchema.safeParse(origin);
  return result.success ? result.data : null;
};
