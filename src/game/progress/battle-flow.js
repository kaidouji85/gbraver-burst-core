// @flow

import type {Battle, BattleResult, Effect, GameState, PlayerCommand, PlayerState, TryReflect} from "../..";
import {gameFlow} from "./game-flow";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import {reflect} from "../../effect/reflect";
import type {HistoryUpdate} from "./game-flow";

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
    state => {
      if (state.effect.name === 'Battle') {
        const battle: Battle = state.effect;
        return [
            ...(canReflectFlow(battle.result) ? reflectFlow(state) : [])
        ];
      }
      return [];
    },
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

/**
 * ダメージ反射フローを実行できるか否かを判定する
 *
 * @param battle 戦闘結果
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
      const tryReflect: TryReflect = (v: TryReflect);
      return (state: GameState): GameState[] => [reflect(state, attackerState.playerId, tryReflect.damage, tryReflect.effect)];
    });

  return gameFlow(lastState, historyUpdates);
}