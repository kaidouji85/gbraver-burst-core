// @flow
import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBattery} from "./enable-battery";
import {getEnableBurstCommand} from "./enable-burst-command";
import type {BatteryCommand} from "../../command/battery";

export function getEnableCommand(player: PlayerState): Command[] {
  const enableBattery: number[] = getEnableBattery(player.armdozer);
  const batteryCommand: BatteryCommand[] = enableBattery.map(v => ({type: 'BATTERY_COMMAND', battery: v}));

  return [
    ...batteryCommand,
    ...getEnableBurstCommand(player.armdozer)
  ];
}