import type { Burst } from "../../player/burst/burst";
import type { PlayerId } from "../../player/player";

/** バースト効果 */
export type BurstEffect = Readonly<{
  name: "BurstEffect";
  /** バーストしたプレイヤーのID */
  burstPlayer: PlayerId;
  /** バースト内容 */
  burst: Burst;
}>;
