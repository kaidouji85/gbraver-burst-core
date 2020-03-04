// @flow

import type {PlayerCommand} from "../../player/command/player-command";
import type {GameState} from "../..";
import {gameFlow} from "./game-flow";
import {burst} from "../../effect/burst";
import {inputCommandAfterBurst} from "../../effect/input-command";

/**
 * バーストフェイズを行うか否かを判定する
 *
 * @param commands プレイヤーが選択したコマンド
 * @return 判定結果、trueでバーストフェイズを行う
 */
export function isBurstFlow(commands: PlayerCommand[]): boolean {
  return commands.map(v => v.command.type)
    .includes('BURST_COMMAND');
}

/**
 * バーストのフロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function burstFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
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