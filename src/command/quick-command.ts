import {BurstCommand} from "./burst";
import {PilotSkillCommand} from "./pilot-skill";
import {Command} from "./command";

/**　クイックコマンド　*/
export type QuickCommand = BurstCommand | PilotSkillCommand;

/**
 * 指定したコマンドをクイックコマンドにキャストする
 * キャストできない場合はnullを返す
 * @param command キャストするコマンド
 * @return キャスト結果
 */
export function castQuickCommand(command: Command): QuickCommand | null {
  switch (command.type) {
    case "BURST_COMMAND":
    case "PILOT_SKILL_COMMAND":
      return command;
    default:
      return null;
  }
}