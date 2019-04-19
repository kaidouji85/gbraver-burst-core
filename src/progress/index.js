// @flow
import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {battle} from "../effect/battle";
import {turnChange} from "../effect/turn-change";
import {inputCommand} from "../effect/input-command";
import type {ApplyEffect} from "./apply-effects";
import {applyEffects} from "./apply-effects";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param command1 プレイヤー1のコマンド
 * @param command2 プレイヤー2のコマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  // TODO 戦闘、バーストの分岐を作る
  const effects = doBattle(commands);
  return applyEffects(lastState, effects);
}

/**
 * 戦闘を実行する
 *
 * @param commands
 * @returns {(function(*=): GameState)[]}
 */
function doBattle(commands: PlayerCommand[]): ApplyEffect[] {
  return [
    state => battle(state, commands),
    state => turnChange(state),
    state => inputCommand(state)
  ];
}