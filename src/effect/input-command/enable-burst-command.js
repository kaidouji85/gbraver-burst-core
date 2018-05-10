// @flow
import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {Command} from "../../command/command";

/**
 * アームドーザの状態から、バーストが使えるか否かを判定する
 *
 * @param armdozer アームドーザの状態
 * @return 判定結果、trueでバーストが使える
 */
export function enableBurst(armdozer: ArmdozerState): boolean {
  return armdozer.enableBurst;
}