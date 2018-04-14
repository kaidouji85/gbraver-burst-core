// @flow

import type {Command} from "../command/command";
import type {PlayerId} from "../player/player";

/** 任意プレイヤーにしか公開しない状態 */
export type SecretPlayerState = {
  playerId: PlayerId,
  lastCommand: Command
};