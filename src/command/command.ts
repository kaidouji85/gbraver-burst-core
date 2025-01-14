import { z } from "zod";

import { BatteryCommand, BatteryCommandSchema } from "./battery";
import { BurstCommand, BurstCommandSchema } from "./burst";
import { PilotSkillCommand, PilotSkillCommandSchema } from "./pilot-skill";

/** コマンド */
export type Command = BatteryCommand | BurstCommand | PilotSkillCommand;

/** コマンド zodスキーマ */
export const CommandSchema = z.union([
  BatteryCommandSchema,
  BurstCommandSchema,
  PilotSkillCommandSchema,
]);

/**
 * コマンドが等しいかどうかを判定する
 * @param command1 コマンド1
 * @param command2 コマンド2
 * @returns trueで等しいコマンド
 */
export function isCommandEqual(command1: Command, command2: Command): boolean {
  return (
    (command1.type === "BATTERY_COMMAND" &&
      command2.type === "BATTERY_COMMAND" &&
      command1.battery === command2.battery) ||
    (command1.type === "BURST_COMMAND" && command2.type === "BURST_COMMAND") ||
    (command1.type === "PILOT_SKILL_COMMAND" &&
      command2.type === "PILOT_SKILL_COMMAND")
  );
}
