// @flow

import {gameFlow} from "./game-flow";
import type {Battle} from '../../effect/battle/battle';
import type {BattleResult} from '../../effect/battle/result/battle-result';
import type {GameState} from '../../state/game-state';
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
    state => {
      const doneBattle = battle(state, commands);
      if (doneBattle.effect.name !== 'Battle') {
        return [];
      }

      const battleEffect = (doneBattle.effect: Battle);
      return [
        doneBattle,
        ...gameFlow(doneBattle, [
          state => canReflectFlow(battleEffect.result)
            ? reflectFlow(state)
            : [],
          state => canRightItself(battleEffect)
            ? [rightItself(state, battleEffect)]
            : [],
          state => {
            const endJudge = gameEndJudging(state);
            if (endJudge.type === 'GameContinue') {
              return gameFlow(state, [
                state => [updateRemainingTurn(state)],
                state => [turnChange(state)],
                state => [inputCommand(state)]
              ]);
            } else {
              return [gameEnd(state, endJudge)];
            }
          }
        ])
      ];
    }
  ]);
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

  const tryReflects: TryReflect[] = defender.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => ((v: any): TryReflect));
  return gameFlow(lastState, tryReflects.map(tryReflect =>
    state => [reflect(state, attacker.playerId, tryReflect.damage, tryReflect.effect)]
  ));
}

/**
 * 体勢整えを実施するか否かを判定する、trueで実施する
 *
 * @param battle 戦闘情報
 * @return 判定結果
 */
export function canRightItself(battle: Battle): boolean {
  return !battle.isDeath;
}