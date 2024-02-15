import { PlayerState } from "../../state/player-state";

/** バースト発動結果 */
export type BurstInvokeResult = {
  /** バースト発動プレイヤー バースト発動後のステート */
  invoker: PlayerState;
  /** それ以外のプレイヤー バースト発動後のステート */
  other: PlayerState;
};
