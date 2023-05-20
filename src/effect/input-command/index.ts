import type { Command } from "../../command/command";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { InputCommand, NoChoice, Selectable } from "./input-command";
import { selectableBatteryCommand } from "./selectable-battery-command";
import { selectableBurstCommand } from "./selectable-burst-command";
import { selectablePilotSkillCommand } from "./selectable-pilot-skill-command";
import {castQuickCommand} from "../../command/quick-command";

/**
 * ゲームスタート時だけに利用するInputCommand
 * InputCommandはそのターンに入力したコマンドを参照する想定だが、
 * ゲーム開始時にコマンド入力できないので、本関数を用意した
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function gameStartInputCommand(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: "InputCommand",
      players: lastState.players.map((v) => selectable(v)),
    },
  };
}
// TODO 引数を[PlayerCommand, PlayerCommand]に変更する

/**
 * コマンド入力フェイズのステートを生成する
 *
 * @param lastState 更新前の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerCommand 攻撃側コマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderCommand 防御側コマンド
 * @return 更新結果
 */
export function inputCommand(
  lastState: GameState,
  attackerId: PlayerId,
  attackerCommand: Command,
  defenderId: PlayerId,
  defenderCommand: Command
): GameStateX<InputCommand> {
  const attacker = lastState.players.find((v) => v.playerId === attackerId);
  const defender = lastState.players.find((v) => v.playerId === defenderId);

  if (!attacker || !defender) {
    throw new Error("not found attacker or defender command");
  }

  const nextAttackerCommand = isNoChoice(attackerCommand, defenderCommand)
    ? noChoice(attacker, attackerCommand)
    : selectable(attacker);
  const nextDefenderCommand = isNoChoice(defenderCommand, attackerCommand)
    ? noChoice(defender, defenderCommand)
    : selectable(defender);
  const playerCommands = [nextAttackerCommand, nextDefenderCommand];
  const effect: InputCommand = {
    name: "InputCommand",
    players: playerCommands,
  };
  return { ...lastState, effect: effect };
}

/**
 * コマンド選択不可能か否かを判定する
 *
 * @param myCommand 自分のコマンド
 * @param otherCommand 相手のコマンド
 * @return {boolean}
 */
export function isNoChoice(myCommand: Command, otherCommand: Command): boolean {
  return (
    myCommand.type === "BATTERY_COMMAND" && !!castQuickCommand(otherCommand)
  );
}

/**
 * コマンド選択可能なケース
 *
 * @param player プレイヤー情報
 * @return プレイヤーが次のターンに入力可能なコマンド
 */
function selectable(player: PlayerState): Selectable {
  return {
    playerId: player.playerId,
    selectable: true,
    command: [
      ...selectableBatteryCommand(player.armdozer),
      ...selectableBurstCommand(player.armdozer),
      ...selectablePilotSkillCommand(player.pilot),
    ],
  };
}

/**
 * コマンド選択が不可能なケース
 * このターンに選択したコマンドをそのまま次も選択する
 *
 * @param player プレイヤー情報
 * @param command このターンの入力したコマンド
 * @return プレイヤーが次のターンに入力可能なコマンド
 */
function noChoice(player: PlayerState, command: Command): NoChoice {
  return {
    playerId: player.playerId,
    selectable: false,
    nextTurnCommand: command,
  };
}
