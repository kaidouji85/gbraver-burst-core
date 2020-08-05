// @flow
import type {BatteryCommand} from "./battery";
import type {BurstCommand} from "./burst";
import type {EmptyCommand} from "./empty-command";
import type {PlayerId} from "..";
import type {PilotSkillCommand} from "./pilot-skill";

/** コマンド */
export type Command = EmptyCommand | BatteryCommand | BurstCommand | PilotSkillCommand;

/**
 * クイックコマンド
 */
export type QuickCommand = BurstCommand | PilotSkillCommand;

/**
 * 指定したコマンドをクイックコマンドにキャストする
 * キャストできない場合はnullを返す
 *
 * @param command キャストするコマンド
 * @return キャスト結果
 */
export function castQuickCommand(command: Command): ?QuickCommand {
  switch (command.type) {
    case 'BURST_COMMAND':
    case 'PILOT_SKILL_COMMAND':
      return command;
    default:
      return null;
  }
}

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