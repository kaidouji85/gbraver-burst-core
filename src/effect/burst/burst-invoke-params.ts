import { PlayerState } from "../../state/player-state";

/**
 * バースト発動パラメータ
 * @template X バースト情報
 */
export type BurstInvokeParams<X> = {
  /** 発動するバースト */
  burst: X;
  /** バースト発動プレイヤー バースト前のステート */
  invoker: PlayerState;
  /** それ以外のプレイヤー バースト前のステート */
  other: PlayerState;
};
