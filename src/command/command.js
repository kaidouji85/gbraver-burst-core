// @flow
import type {BatteryCommand} from "./battery";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";
import type {PlayerId} from "..";
import type {PilotSkillCommand} from "./pilot-skill";

/** コマンド */
export type Command = EmptyCommand | BatteryCommand | BurstCommand | PilotSkillCommand;

/**
 * プレイヤーコマンド
 *
 * @typeparam {X} コマンド
 */
export type PlayerCommandX<X> = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** コマンド */
  command: X
};

/** プレイヤーコマンド */
export type PlayerCommand = PlayerCommandX<Command>;