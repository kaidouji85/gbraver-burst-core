// @flow
import * as R from 'ramda';
import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {battle} from "../effect/battle";
import {turnChange} from "../effect/turn-change";
import {inputCommand, inputCommandAfterBurst} from "../effect/input-command";
import {burst} from "../effect/burst";
import {isBurstFlow} from "./is-burst-flow";
import {gameEnd} from "../effect/game-end";
import {gameEndJudging} from "../game-end-judging";

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

function burstFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const attackerCommand = commands.find(v => v.playerId === lastState.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    return [];
  }

  return gameFlow(lastState, [
    history => attackerCommand.command.type === 'BURST_COMMAND'
      ? [...history, burst(getLastState(history), attackerCommand.playerId)]
      : history,
    history => defenderCommand.command.type === 'BURST_COMMAND'
      ? [...history, burst(getLastState(history), defenderCommand.playerId)]
      : history,
    history => [...history, inputCommandAfterBurst(getLastState(history), commands)],
  ]);
}

function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  return gameFlow(lastState, [
    history => [...history, battle(getLastState(history), commands)],
    history => {
      const endJudge = gameEndJudging(getLastState(history));
      if (endJudge.type !== 'GameContinue') {
        return [
          ...history,
          gameEnd(getLastState(history), endJudge)
        ];
      } else {
        return [
          ...history,
          ...gameFlow(getLastState(history), [
            history => [...history, turnChange(getLastState(history))],
            history => [...history, inputCommand(getLastState(history))]
          ])
        ];
      }
    }
  ]);
}

export type HistoryUpdate = (history: GameState[]) => GameState[];

export function gameFlow(lastState: GameState, updateList: HistoryUpdate[]): GameState[] {
  return R.pipe(...updateList)([lastState]).slice(1);
}

export function getLastState(history: GameState[]): GameState {
  return history[history.length - 1];
}