// @flow

import type {PlayerId} from "../../player/player";
import type {Command} from "../../command/command";

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
