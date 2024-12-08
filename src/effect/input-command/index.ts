import type { Command } from "../../command/command";
import { PlayerCommand } from "../../game/command/player-command";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { InputCommand, NoChoice, Selectable } from "./input-command";
import { selectableBatteryCommand } from "./selectable-battery-command";
import { selectableBurstCommand } from "./selectable-burst-command";
import { selectablePilotSkillCommand } from "./selectable-pilot-skill-command";

/**
 * コマンド選択可能なケース
 * @param player プレイヤー情報
 * @returns プレイヤーが次のターンに入力可能なコマンド
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
 * @param player プレイヤー情報
 * @param command このターンの入力したコマンド
 * @returns プレイヤーが次のターンに入力可能なコマンド
 */
function noChoice(player: PlayerState, command: Command): NoChoice {
  return {
    playerId: player.playerId,
    selectable: false,
    nextTurnCommand: command,
  };
}

/**
 * ゲームスタート時だけに利用するInputCommand
 * InputCommandはそのターンに入力したコマンドを参照する想定だが、
 * ゲーム開始時にコマンド入力できないので、本関数を用意した
 * @param lastState 最新のゲームステート
 * @returns 更新結果
 */
export function inputCommandOnGameStart(lastState: GameState): GameState {
  return {
    ...lastState,
    effect: {
      name: "InputCommand",
      players: lastState.players.map((v) => selectable(v)),
    },
  };
}

/** InputCommandのパラメータ */
type InputCommandParams = {
  /** 最新のゲームステート */
  lastState: GameState;
  /** 特定プレイヤーのコマンドを強制する場合にセットする変数 */
  noChoices: PlayerCommand[];
};

/**
 * コマンド入力フェイズのステートを生成する
 * @param params パラメータ
 * @returns 更新結果
 */
export function inputCommand(
  params: InputCommandParams,
): GameStateX<InputCommand> {
  const { lastState, noChoices } = params;
  const attacker = lastState.players.find(
    (v) => v.playerId === lastState.activePlayerId,
  );
  const defender = lastState.players.find(
    (v) => v.playerId !== lastState.activePlayerId,
  );
  if (!attacker || !defender) {
    throw new Error("not found attacker or defender");
  }

  const attackerNoChoice = noChoices.find(
    (v) => v.playerId === attacker.playerId,
  );
  const nextAttackerCommand = attackerNoChoice
    ? noChoice(attacker, attackerNoChoice.command)
    : selectable(attacker);
  const defenderNoChoice = noChoices.find(
    (v) => v.playerId !== defender.playerId,
  );
  const nextDefenderCommand = defenderNoChoice
    ? noChoice(defender, defenderNoChoice.command)
    : selectable(defender);
  const playerCommands = [nextAttackerCommand, nextDefenderCommand];
  const effect: InputCommand = {
    name: "InputCommand",
    players: playerCommands,
  };
  return { ...lastState, effect: effect };
}
