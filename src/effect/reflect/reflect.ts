import { z } from "zod";

import { PlayerId, PlayerIdSchema } from "../../player/player";
import { ReflectDamageEffect, ReflectDamageEffectSchema } from "../../state/armdozer-effect/reflect-damage-effect";

/** ダメージ反射 パラメータ */
export type ReflectParam = Readonly<{
  /** 反射するダメージ */
  damage: number;
  /** ダメージエフェクト */
  effect: ReflectDamageEffect;
}>;

/** ReflectParam zodスキーマ */
export const ReflectParamSchema = z.object({
  damage: z.number(),
  effect: ReflectDamageEffectSchema,
});

/** ダメージ反射 結果 */
export type Reflect = ReflectParam &
  Readonly<{
    name: "Reflect";
    /** 反射ダメージを受けたプレイヤー */
    damagedPlayer: PlayerId;
    /** 死亡フラグ */
    isDeath: boolean;
  }>;

/** Reflect zodスキーマ */
export const ReflectSchema = ReflectParamSchema.extend({
  name: z.literal("Reflect"),
  damagedPlayer: PlayerIdSchema,
  isDeath: z.boolean(),
})
