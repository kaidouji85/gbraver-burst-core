// @flow

import type {PlayerId} from "../../player/player";
import type {Command} from "../../command/command";

/**
 * プレイヤーコマンド
 *
 * @typeparam {X} コマンド
 */
export type PlayerCommandX<X> = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** コマンド */
  command: X
};

/**
 * プレイヤーコマンド
 */
export type PlayerCommand = PlayerCommandX<Command>;