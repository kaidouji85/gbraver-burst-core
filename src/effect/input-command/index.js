// @flow

import type {PlayerId} from "../../player/player";
import type {Command} from "../../command/command";
import type {ArmdozerState} from "../../game-state/armdozer-state";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";

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
