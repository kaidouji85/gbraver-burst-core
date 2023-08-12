import {ReflectDamageEffect, ReflectDamageEffectSchema} from "./reflect-damage-effect";
import {EffectPeriod, EffectPeriodSchema} from "./effect-period";
import {z} from "zod";

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

/**
 * 任意オブジェクトをTryReflectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseTryReflect = (origin: unknown): TryReflect | null => {
  const result = TryReflectSchema.safeParse(origin);
  return result.success ? result.data : null;
};