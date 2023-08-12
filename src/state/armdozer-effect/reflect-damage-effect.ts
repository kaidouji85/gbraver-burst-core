import {z} from "zod";

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = "Lightning";

/** ReflectDamageEffect zodスキーマ */
export const ReflectDamageEffectSchema = z.literal("Lightning");

/**
 * 任意オブジェクトをReflectDamageEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseReflectDamageEffect = (
  origin: unknown,
): ReflectDamageEffect | null => {
  const result = ReflectDamageEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
};