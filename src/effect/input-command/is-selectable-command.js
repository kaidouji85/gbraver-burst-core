// @flow

import type {Command} from "../../command/command";

export function isSelectableCommand(command: Command): boolean {
  return command.type === 'BURST_COMMAND';
}