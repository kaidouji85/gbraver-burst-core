import { z } from "zod";

import {
  SpecialPeriodEffect,
  SpecialPeriodEffectSchema,
} from "./special-period-effect";
import { TurnLimitEffect, TurnLimitEffectSchema } from "./turn-limit-effect";

/** エフェクト有効期間 */
export type EffectPeriod = TurnLimitEffect | SpecialPeriodEffect;

/** EffectPeriod zodスキーマ */
export const EffectPeriodSchema = z.union([
  TurnLimitEffectSchema,
  SpecialPeriodEffectSchema,
]);
