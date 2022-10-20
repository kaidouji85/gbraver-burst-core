// @flow

import type { Burst } from "../../player/burst";
import type { PlayerId } from "../../player/player";

/** バースト効果 */
export type BurstEffect = {
  name: "BurstEffect",
  burstPlayer: PlayerId,
  burst: Burst,
};
