// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {Command} from "../../command/command";

/**
 * アームドーザの状態から、バースト系コマンドで使えるものを返す
 * 使えるコマンドがない場合は空配列を返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
export function getEnableBurstCommand(armdozer: ArmdozerState): Command[] {
  return armdozer.enableBurst ? [{type: 'BURST_COMMAND'}] : [];
}