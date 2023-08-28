import { z } from "zod";

import { PlayerId,PlayerIdSchema } from "../../player/player";
import { ArmdozerEffect, ArmdozerEffectSchema } from "../../state/armdozer-effect";

/** 終了したアームドーザ効果 */
export type EndArmdozerEffect = Readonly<{
  /** プレイヤーID */
  playerId: PlayerId;
  /** 終了したエフェクト */
  effect: ArmdozerEffect;
}>;

/** EndArmdozerEffect zodスキーマ */
export const EndArmdozerEffectSchema = z.object({
  playerId: PlayerIdSchema,
  effect: ArmdozerEffectSchema,
});

/** 効果継続ターン数を更新する */
export type UpdateRemainingTurn = Readonly<{
  name: "UpdateRemainingTurn";
  /** 終了したアームドーザ効果 */
  endArmdozerEffects: EndArmdozerEffect[];
}>;

/** UpdateRemainingTurn zodスキーマ */
export const UpdateRemainingTurnSchema = z.object({
  name: z.literal("UpdateRemainingTurn"),
  endArmdozerEffects: z.array(EndArmdozerEffectSchema),
});