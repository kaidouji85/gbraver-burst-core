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
 * コマンドにパースする
 * @param origin パース元
 * @return パース結果、失敗した場合はnull
 */
export function parseCommand(origin: unknown): Command | null {
  const result = CommandSchema.safeParse(origin);
  return result.success ? result.data : null;
}
