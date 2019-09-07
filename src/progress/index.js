// @flow
import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {battle} from "../effect/battle";
import {turnChange} from "../effect/turn-change";
import {inputCommand, inputCommandAfterBurst} from "../effect/input-command";
import type {ApplyEffect} from "./apply-effects";
import {applyEffects} from "./apply-effects";
import {burst} from "../effect/burst";
import type {PlayerId} from "../player/player";
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
    return applyEffects(lastState, burstFlow(lastState.activePlayerId, commands));
  }

  return battleFlow(lastState, commands);
}

/**
 * バースト関連の効果適用関数
 *
 * @param activePlayerId アクティブプレイヤーのID
 * @param commands コマンド
 * @return 効果適用関数
 */
function burstFlow(activePlayerId: PlayerId, commands: PlayerCommand[]): ApplyEffect[] {
  const attackerCommand = commands.find(v => v.playerId === activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    return [];
  }

  return [
    state => attackerCommand.command.type === 'BURST_COMMAND'
      ? burst(state, attackerCommand.playerId)
      : null,
    state => defenderCommand.command.type === 'BURST_COMMAND'
      ? burst(state, defenderCommand.playerId)
      : null,
    state => inputCommandAfterBurst(state, commands)
  ];
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