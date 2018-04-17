// @flow
import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBatteryCommand} from "./enable-battery-command";
import {getEnableBurstCommand} from "./enable-burst-command";
import type {EnableCommand, InputCommand} from "./input-command";
import type {GameState} from "../../game-state/game-state";

export function getEnableCommand(player: PlayerState): Command[] {
  return [
    ...getEnableBatteryCommand(player.armdozer),
    ...getEnableBurstCommand(player.armdozer)
  ];
}