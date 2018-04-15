// @flow

import * as R from 'ramda';
import type {PlayerId} from "../player/player";
import type {Command} from "../command/command";
import type {ArmdozerState} from "../game-state/armdozer-state";

/** コマンド入力 */
export type InputCommand = {
  name: 'InputCommand',
  players: EnableCommand[]
};

/** プレイヤー毎の入力可能コマンドをまとめたもの */
export type EnableCommand = {
  playerId: PlayerId,
  command: Command[]
};

/**
 * プレイヤーの状態から入力可能なコマンドを計算する
 *
 * @param player プレイヤーの状態
 * @return 入力可能なコマンド
 */
export function getEnableCommandList(armdozer: ArmdozerState): Command[] {
  return [
    ...getBatteryCommand(armdozer),
    ...getBurstCommand(armdozer)
  ];
}

/**
 * アームドーザの状態から、バッテリー系コマンドで使えるものを返す
 * 使えるコマンドがない場合は空配列を返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
function getBatteryCommand(armdozer: ArmdozerState): Command[] {
  return R.range(0, armdozer.maxBattery + 1)
    .filter(v => v <= armdozer.battery)
    .map(v => ({type: 'BATTERY_COMMAND', battery: v}));
}

/**
 * アームドーザの状態から、バースト系コマンドで使えるものを返す
 * 使えるコマンドがない場合は空配列を返す
 *
 * @param armdozer アームドーザの状態
 * @return 計算結果
 */
function getBurstCommand(armdozer: ArmdozerState): Command[] {
  return armdozer.enableBurst ? [{type: 'BURST_COMMAND'}] : [];
}