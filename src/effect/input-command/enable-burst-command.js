// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {BurstCommand} from "../../command/burst";

/**
 * 使用可能なバーストコマンドを返す
 *
 * @param armdozer アームドーザの状態
 * @returns 計算結果
 */
export function getEnableBurstCommand(armdozer: ArmdozerState): BurstCommand[] {
  return armdozer.enableBurst ? [{type: 'BURST_COMMAND'}] : [];
}
