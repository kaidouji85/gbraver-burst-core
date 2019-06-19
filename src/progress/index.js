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

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const effects = isBurstFlow(commands)
    ? burstFlow(lastState.activePlayerId, commands)
    : battleFlow(commands);
  return applyEffects(lastState, effects);
}

/**
 * バーストフェイズを実施するか否かを判定する
 *
 * @param commands コマンド
 * @return 判定結果、trueでバーストフェイズを実施する
 */
function isBurstFlow(commands: PlayerCommand[]): boolean {
  const burstCommands = commands.filter(v => v.command.type === 'BURST_COMMAND');
  return 0 < burstCommands.length;
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

  const attackerEffect = attackerCommand.command.type === 'BURST_COMMAND'
    ? [(state: GameState) => burst(state, attackerCommand.playerId)]
    : [];
  const defenderEffect = defenderCommand.command.type === 'BURST_COMMAND'
    ? [(state: GameState) => burst(state, defenderCommand.playerId)]
    : [];
  return [
      ...attackerEffect,
      ...defenderEffect,
    state => inputCommandAfterBurst(state, commands)
  ];
}

/**
 * 戦闘関連の効果適用関数
 *
 * @param commands プレイヤーコマンド
 * @return 効果適用関数
 */
function battleFlow(commands: PlayerCommand[]): ApplyEffect[] {
  return [
    state => battle(state, commands),
    state => turnChange(state),
    state => inputCommand(state)
  ];
}
