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

  const getLastState = (history: GameState[]) => history[history.length - 1];
  return R.pipe(
    (history: GameState[]): GameState[] =>
      attackerCommand.command.type === 'BURST_COMMAND'
        ? [...history, burst(getLastState(history), attackerCommand.playerId)]
        : history,
    (history: GameState[]): GameState[] =>
      defenderCommand.command.type === 'BURST_COMMAND'
        ? [...history, burst(getLastState(history), defenderCommand.playerId)]
        : history,
    (history: GameState[]): GameState[] => {
      return [...history, inputCommandAfterBurst(getLastState(history), commands)];
    },
  )([lastState]).slice(1);
}

function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const doneBattle = battle(lastState, commands);
  const endJudge = gameEndJudging(doneBattle);
  if (endJudge.type !== 'GameContinue') {
    const doneGameEnd = gameEnd(doneBattle, endJudge);
    return [
      doneBattle,
      doneGameEnd
    ];
  }

  const doneTurnChange = turnChange(doneBattle);
  const doneInputCommand = inputCommand(doneTurnChange);
  return [
    doneBattle,
    doneTurnChange,
    doneInputCommand
  ];
}