// @flow
import type {BatteryCommand} from "./battery";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";
import type {PlayerId} from "..";

/** コマンド */
export type Command = EmptyCommand | BatteryCommand | BurstCommand;

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