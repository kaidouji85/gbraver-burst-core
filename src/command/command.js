// @flow
import type {BatteryCommand} from "./battery";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";

/** コマンド */
export type Command = EmptyCommand | BatteryCommand | BurstCommand;