// @flow
import type {AttackCommand} from "./attack";
import type {DefenseCommand} from "./defense";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";

/** コマンド */
export type Command = EmptyCommand | AttackCommand | DefenseCommand | BurstCommand;