import { PlayerState } from "../../state/player-state";

/**
 * 発動者がバーストを発動できない状態にする
 * @param invoker バースト発動者
 * @return ステート更新結果
 */
export function disableInvokerBurst(invoker: PlayerState): PlayerState {
  return {
    ...invoker,
    armdozer: {
      ...invoker.armdozer,
      enableBurst: false,
    },
  };
}
