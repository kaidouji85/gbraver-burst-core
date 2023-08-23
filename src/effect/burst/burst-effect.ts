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
