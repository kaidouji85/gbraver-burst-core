// @flow
import type {PlayerState} from "../../game-state/player-state";
import type {Command} from "../../command/command";
import {getEnableBattery} from "./enable-battery";
import {enableBurst} from "./enable-burst-command";
import type {BatteryCommand} from "../../command/battery";
import type {BurstCommand} from "../../command/burst";

export function getEnableCommand(player: PlayerState): Command[] {
  const batteryCommand: BatteryCommand[] = getEnableBattery(player.armdozer)
    .map(v => ({type: 'BATTERY_COMMAND', battery: v}));
  const burstCommand: BurstCommand[] = enableBurst(player.armdozer) ? [{type: 'BURST_COMMAND'}] : [];

  return [
    ...batteryCommand,
    ...burstCommand
  ];
}