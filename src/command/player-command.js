// @flow

import type {Command} from "./command";
import type {PlayerId} from "../player/player";

export type PlayerCommand = {
  playerId: PlayerId,
  command: Command
};