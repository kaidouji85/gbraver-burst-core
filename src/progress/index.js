// @flow

import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {battle} from "../effect/battle";
import {turnChange} from "../effect/turn-change";
import {inputCommand, inputCommandAfterBurst} from "../effect/input-command";
import {burst} from "../effect/burst";
import {isBurstFlow} from "./is-burst-flow";
import {gameEnd} from "../effect/game-end";
import {gameEndJudging} from "../game-end-judging";
import {gameFlow} from "./game-flow";
import {batteryDeclaration} from "../effect/battery-declaration";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  if (isBurstFlow(commands)) {
    return burstFlow(lastState, commands);
  }

  return battleFlow(lastState, commands);
}

/**
 * バーストのフロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
function burstFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const attackerCommand = commands.find(v => v.playerId === lastState.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    return [];
  }

  return gameFlow(lastState, [
    state => attackerCommand.command.type === 'BURST_COMMAND'
      ? [burst(state, attackerCommand.playerId)]
      : [],
    state => defenderCommand.command.type === 'BURST_COMMAND'
      ? [burst(state, defenderCommand.playerId)]
      : [],
    state => [inputCommandAfterBurst(state, commands)],
  ]);
}

/**
 * 戦闘のフロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  return gameFlow(lastState, [
    state => [batteryDeclaration(state, commands)],
    state => [battle(state, commands)],
    state => {
      const endJudge = gameEndJudging(state);
      if (endJudge.type !== 'GameContinue') {
        return [gameEnd(state, endJudge)];
      }

      return gameFlow(state, [
        v => [turnChange(v)],
        v => [inputCommand(v)]
      ]);
    }
  ]);
}
