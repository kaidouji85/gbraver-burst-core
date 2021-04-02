// @flow

import type {GameState} from "../../state/game-state";
import {upcastGameState} from "../../state/game-state";
import {gameFlow} from "../flow/game-flow";
import {burst} from "../../effect/burst";
import {inputCommand} from "../../effect/input-command";
import {pilotSkill} from "../../effect/pilot-skill";
import type {PlayerCommand} from "../command/player-command";

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
    state => {
      const done = inputCommand(
        state,
        attackerCommand.playerId,
        attackerCommand.command,
        defenderCommand.playerId,
        defenderCommand.command
      );
      return done ? [upcastGameState(done)] : [];
    },
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
  if (command.command.type === 'BURST_COMMAND') {
    const done = burst(state, command.playerId);
    return done ? [upcastGameState(done)] : [];
  }

  if (command.command.type === 'PILOT_SKILL_COMMAND') {
    const done = pilotSkill(state, command.playerId);
    return done ? [upcastGameState(done)] : [];
  }

  return [];
}