// @flow

import type {Command, PlayerId} from "../..";

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