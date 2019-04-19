// @flow

import type {PlayerId} from "../../player/player";
import type {Burst} from "../../armdozer/burst";

/** バースト効果 */
export type BurstEffect = {
  name: 'BurstEffect',
  burstPlayer: PlayerId,
  burst: Burst,
};
