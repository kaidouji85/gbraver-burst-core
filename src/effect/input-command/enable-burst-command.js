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
  const enable = canBurst(armdozer);
  return toBurstCommandList(enable);
}

/**
 * アームドーザの状態から、バーストが使えるか否かを判定する
 *
 * @param armdozer アームドーザの状態
 * @return 判定結果、trueでバーストが使える
 */
export function canBurst(armdozer: ArmdozerState): boolean {
  return armdozer.enableBurst;
}

/**
 * バーストが使えるか否かのフラグをバーストコマンドリストに変換する
 *
 * @param enableBurst バーストが使えるか否か、tureで使える
 * @return バーストコマンドのリスト
 */
export function toBurstCommandList(canBurst: boolean): BurstCommand[] {
  return canBurst ? [{type: 'BURST_COMMAND'}] : [];
}