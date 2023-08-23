import { z } from "zod";

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = "Lightning";

/** ReflectDamageEffect zodスキーマ */
export const ReflectDamageEffectSchema = z.literal("Lightning");
