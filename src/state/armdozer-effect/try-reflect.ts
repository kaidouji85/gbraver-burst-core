import { z } from "zod";

import { EffectPeriod, EffectPeriodSchema } from "./effect-period";
import {
  ReflectDamageEffect,
  ReflectDamageEffectSchema,
} from "./reflect-damage-effect";

/** ダメージ反射 */
export type TryReflect = Readonly<{
  type: "TryReflect";
  /** 反射が成功した場合のダメージ */
  damage: number;
  /** 反射のダメージエフェクト */
  effect: ReflectDamageEffect;
  /** エフェクト有効期間 */
  period: EffectPeriod;
}>;

/** TryReflect zodスキーマ */
export const TryReflectSchema = z.object({
  type: z.literal("TryReflect"),
  damage: z.number(),
  effect: ReflectDamageEffectSchema,
  period: EffectPeriodSchema,
});
