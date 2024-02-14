import { Burst } from "../../player/burst";
import { PlayerState } from "../../state/player-state";

/** バースト実行結果 */
export type BurstInvokeResult = {
  /** 適用したバースト */
  burst: Burst;
  /** バースト発動者のステート更新結果 */
  invoker: PlayerState;
};
