import { PlayerState } from "../../state/player-state";

/** バースト発動結果 */
export type BurstInvokeResult = {
  /** バースト発動プレイヤー バースト発動後 */
  invoker: PlayerState;
  /** それ以外のプレイヤー */
  other: PlayerState;
};
