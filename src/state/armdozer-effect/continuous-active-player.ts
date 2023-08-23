import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";

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
