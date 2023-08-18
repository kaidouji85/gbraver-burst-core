import { z } from "zod";

import { Burst, BurstSchema } from "../../player/burst";
import { PlayerId, PlayerIdSchema } from "../../player/player";

/** バースト効果 */
export type BurstEffect = Readonly<{
  name: "BurstEffect";
  /** バーストしたプレイヤーのID */
  burstPlayer: PlayerId;
  /** バースト内容 */
  burst: Burst;
}>;

/** BurstEffect zodスキーマ */
export const BurstEffectSchema = z.object({
  name: z.literal("BurstEffect"),
  burstPlayer: PlayerIdSchema,
  burst: BurstSchema,
});

/**
 * 任意オブジェクトをBurstEffectにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBurstEffect = (origin: unknown): BurstEffect | null => {
  const result = BurstEffectSchema.safeParse(origin);
  return result.success ? result.data : null;
};
