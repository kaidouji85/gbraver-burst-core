// @flow

import type {Command} from "../../command/command";
import type {PlayerId} from "../player";

export type PlayerCommand = {
  playerId: PlayerId,
  command: Command
};