// @flow
import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";

export function getEnableCommand(player: PlayerState): Command[] {
  return [
    ...getEnableBatteryCommand(player.armdozer),
    ...getEnableBurstCommand(player.armdozer)
  ];
}