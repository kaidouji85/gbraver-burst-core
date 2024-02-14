import { PlayerState } from "../../state/player-state";

/**
 * バースト発動情報
 * @template X バースト情報
 */
export type BurstInvoke<X> = {
  /** 発動するバースト */
  burst: X;
  /** バースト発動プレイヤー バースト前のステート */
  invoker: PlayerState;
  /** それ以外のプレイヤー バースト前のステート */
  other: PlayerState;
};

/** バースト発動結果 */
export type BurstInvokeResult = {
  /** バースト発動プレイヤー バースト発動後 */
  invoker: PlayerState;
  /** それ以外のプレイヤー */
  other: PlayerState;
};
