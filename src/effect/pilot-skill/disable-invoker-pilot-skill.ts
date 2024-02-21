import { PlayerState } from "../../state/player-state";

/**
 * 発動者がパイロットスキルを発動できない状態にする
 * @param invoker パイロットスキル発動者
 * @return ステート更新結果
 */
export function disableInvokerPilotSkill(invoker: PlayerState): PlayerState {
  return {
    ...invoker,
    pilot: {
      ...invoker.pilot,
      enableSkill: false,
    }
  };
}
