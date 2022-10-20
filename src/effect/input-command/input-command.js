// @flow

import type { Command } from "../../command/command";
import type { PlayerId } from "../../player/player";

/** コマンド入力 */
export type InputCommand = {
  name: "InputCommand",

  /** 各プレイヤーのコマンド */
  players: Array<Selectable | NoChoice>,
};

/**
 * コマンドが自由に選択できるケース
 * selectable = trueなら、このデータ型になる
 */
export type Selectable = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** コマンドが選択できるか否かのフラグ*/
  selectable: true,
  /** プレイヤーが選択できるコマンド */
  command: Command[],
};

/**
 * コマンドが強制されているケース
 * selectable = falseなら、このデータ型になる
 */
export type NoChoice = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** コマンドが選択できるか否かのフラグ*/
  selectable: false,
  /** プレイヤーが次のターンに実行するコマンド */
  nextTurnCommand: Command,
};
