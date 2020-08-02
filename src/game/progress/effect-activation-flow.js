// @flow

import type {GameState} from "../state/game-state";
import {gameFlow} from "./game-flow";
import {burst} from "../../effect/burst";
import {inputCommand} from "../../effect/input-command";
import type {PlayerCommand} from "../../command/command";
import {pilotSkill} from "../../effect/pilot-skill";

/**
 * 効果発動フローを行うか否かを判定する
 *
 * @param commands プレイヤーが選択したコマンド
 * @return 判定結果、trueでバーストフェイズを行う
 */
export function isEffectActivationFlow(commands: PlayerCommand[]): boolean {
  const types = commands.map(v => v.command.type);
  return types.includes('BURST_COMMAND') || types.includes('PILOT_SKILL_COMMAND');
}

/**
 * 効果発動フロー
 * 現状ではバースト、パイロットスキルを想定している
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function effectActivationFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const attackerCommand = commands.find(v => v.playerId === lastState.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    return [];
  }

  return gameFlow(lastState, [
    state => activationOrNot(state, attackerCommand),
    state => activationOrNot(state, defenderCommand),
    state => [inputCommand(state, commands)],
  ]);
}

/**
 * コマンドに応じて 効果発動 or 何もしない
 *
 * @param state 最新の状態
 * @param command コマンド
 * @return 更新結果
 */
export function activationOrNot(state: GameState, command: PlayerCommand): GameState[] {
  switch(command.command.type) {
    case 'BURST_COMMAND':
      return [burst(state, command.playerId)];
    case 'PILOT_SKILL_COMMAND':
      return [pilotSkill(state, command.playerId)];
    default:
      return [];
  }
}