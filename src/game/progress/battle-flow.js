// @flow

import type {HistoryUpdate} from "./game-flow";
import {gameFlow} from "./game-flow";
import type {Battle} from '../../effect/battle/battle';
import type {BattleResult} from '../../effect/battle/result/battle-result';
import type {GameState} from '../../state/game-state';
import type {PlayerState} from '../../state/player-state';
import type {TryReflect} from '../../state/armdozer-effect';
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import {reflect} from "../../effect/reflect";
import type {PlayerCommand} from "../../command/command";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {rightItself} from "../../effect/right-itself";

/**
 * 戦闘のフロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  return gameFlow(lastState, [
    state => [batteryDeclaration(state, commands)],
    state => [battle(state, commands)],
    (state, history) => {
      const battleEffect = lastBattle(history);
      if (battleEffect && canReflectFlow(battleEffect.result)) {
        return reflectFlow(state);
      } else {
        return [];
      }
    },
    (state, history) => {
      const endJudge = gameEndJudging(state);
      const battleEffect = lastBattle(history);
      if (endJudge.type === 'GameContinue') {
        return gameFlow(state, [
          v => battleEffect
            ? [rightItself(v, battleEffect)]
            : [],
          v => [updateRemainingTurn(v)],
          v => [turnChange(v)],
          v => [inputCommand(v)]
        ]);
      } else {
        return [gameEnd(state, endJudge)];
      }
    }
  ]);
}

/**
 * 最新の戦闘結果を取得する
 * ヒストリーに戦闘結果が1個以外の場合はnullを返す
 *
 * @param history ステートヒストリー
 * @return 最新の戦闘結果
 */
function lastBattle(history: GameState[]): ?Battle {
  const battleHistory = history.filter(v => v.effect.name === 'Battle');
  if (battleHistory.length !== 1) {
    return null;
  }

  const state = battleHistory[0];
  if (state.effect.name !== 'Battle') {
    return null;
  }

  const battleEffect = (state.effect: Battle);
  return battleEffect;
}

/**
 * ダメージ反射フローを実行できるか否かを判定する
 *
 * @param result 戦闘結果
 * @return 判定結果、trueでダメージ反射フローを行う
 */
export function canReflectFlow(result: BattleResult): boolean {
  return result.name === 'NormalHit'
    || result.name === 'Guard'
    || result.name === 'CriticalHit';
}

/**
 * ダメージ反射のフロー
 * 本フローは戦闘直後に呼ばれる想定である
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function reflectFlow(lastState: GameState): GameState[] {
  const attacker = lastState.players.find(v => v.playerId === lastState.activePlayerId);
  const defender = lastState.players.find(v => v.playerId !== lastState.activePlayerId);
  if (!attacker || !defender) {
    return [];
  }

  const attackerState: PlayerState = attacker;
  const defenderState: PlayerState = defender;
  const historyUpdates: HistoryUpdate[] = defenderState.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => {
      const tryReflect = ((v: any): TryReflect);
      return (state: GameState): GameState[] => [reflect(state, attackerState.playerId, tryReflect.damage, tryReflect.effect)];
    });

  return gameFlow(lastState, historyUpdates);
}