// @flow

import type {AttackCommand} from "./attack";
import type {DefenseCommand} from "./defense";
import type {BurstCommand} from "./burst";

/** コマンド */
export type Command = AttackCommand | DefenseCommand | BurstCommand;