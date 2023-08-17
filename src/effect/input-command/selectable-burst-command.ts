import type { BurstCommand } from "../../command/burst";
import type { ArmdozerState } from "../../state/armdozer-state";

/**
 * 使用可能なバーストコマンドを返す
 *
 * @param armdozer アームドーザの状態
 * @returns 計算結果
 */
export function selectableBurstCommand(
  armdozer: ArmdozerState,
): BurstCommand[] {
  return armdozer.enableBurst
    ? [
        {
          type: "BURST_COMMAND",
        },
      ]
    : [];
}
