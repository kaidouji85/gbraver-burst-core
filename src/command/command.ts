import type {BatteryCommand} from "./battery";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";
import type {PilotSkillCommand} from "./pilot-skill";

/** コマンド */
export type Command =
  | EmptyCommand
  | BatteryCommand
  | BurstCommand
  | PilotSkillCommand;

