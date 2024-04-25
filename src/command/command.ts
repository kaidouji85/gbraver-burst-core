import { z } from "zod";

import type { BatteryCommand } from "./battery";
import { BatteryCommandSchema } from "./battery";
import type { BurstCommand } from "./burst";
import { BurstCommandSchema } from "./burst";
import type { EmptyCommand } from "./empty-command";
import { EmptyCommandSchema } from "./empty-command";
import type { PilotSkillCommand } from "./pilot-skill";
import { PilotSkillCommandSchema } from "./pilot-skill";

/** コマンド */
export type Command =
  | EmptyCommand
  | BatteryCommand
  | BurstCommand
  | PilotSkillCommand;

/** コマンド zodスキーマ */
export const CommandSchema = z.union([
  EmptyCommandSchema,
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
    (command1.type === "EMPTY_COMMAND" && command2.type === "EMPTY_COMMAND") ||
    (command1.type === "BURST_COMMAND" && command2.type === "BURST_COMMAND") ||
    (command1.type === "PILOT_SKILL_COMMAND" &&
      command2.type === "PILOT_SKILL_COMMAND")
  );
}
