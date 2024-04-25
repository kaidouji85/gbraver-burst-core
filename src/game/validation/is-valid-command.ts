import { isCommandEqual } from "../../command/command";
import { InputCommand } from "../../effect/input-command/input-command";
import { PlayerCommand } from "../command/player-command";

/**
 * 選択可能なプレイヤーコマンドであるか否かを判定する
 * @param playerCommand 判定対象のプレイヤーコマンド
 * @param inputCommand 「コマンド入力」ステート
 * @returns 判定結果、trueで選択可能なプレイヤーコマンド
 */
export function isValidCommand(
  playerCommand: PlayerCommand,
  inputCommand: InputCommand,
): boolean {
  const player = inputCommand.players.find(
    (player) => player.playerId === playerCommand.playerId,
  );
  if (!player) {
    return false;
  }

  if (player.selectable) {
    return (
      player.command.filter((v) => isCommandEqual(v, playerCommand.command))
        .length > 0
    );
  }

  return isCommandEqual(player.nextTurnCommand, playerCommand.command);
}
