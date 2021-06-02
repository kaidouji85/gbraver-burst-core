// @flow

import {deprecated_gameFlow} from "../deprecated-flow/game-flow";
import type {GameState} from '../../state/game-state';
import {upcastGameState as up} from "../../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {canRightItself, rightItself} from "../../effect/right-itself";
import {extractBatteryCommands} from "./extract-battery-commands";
import type {PlayerCommand, PlayerCommandX} from "../command/player-command";
import {gameContinueFlow} from "./game-continue-flow";
import type {BatteryCommand} from "../../command/battery";
import {start} from "../game-flow/start";
import {chain} from "../game-flow/chain";
import type {BattleResult} from "../../effect/battle/result/battle-result";
import type {PlayerId} from "../../player/player";
import type {TryReflect} from "../../state/armdozer-effect";
import {toReflectParam} from "../../effect/reflect/reflect";
import {reflect} from "../../effect/reflect";
import {updates} from "../game-flow/updates";

/**
 * 戦闘フロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームステート
 */
export function battleFlow(lastState: GameState, commands: [PlayerCommandX<BatteryCommand>, PlayerCommandX<BatteryCommand>]): GameState[] {
  const attacker = commands.find(v => v.playerId === lastState.activePlayerId);
  const defender = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attacker || !defender) {
    throw new Error('not found attacker or defender command');
  }

  start(lastState)
    .to(chain(v => batteryDeclaration(v, attacker.playerId, attacker.command, defender.playerId, defender.command)))
    .to(chain(v => battle(up(v), v.effect.attacker, v.effect.attackerBattery, defender.playerId, v.effect.defenderBattery)))
  return [];
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

export function reflectFlow(lastState: GameState, attackerId: PlayerId): GameState[] {
  const defender = lastState.players.find(v => v.playerId !== attackerId);
  if (!defender) {
    throw new Error('not found defender');
  }

  const tryReflects = defender.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => ((v: any): TryReflect))
    .map(v => toReflectParam(v))
    .map(v => state => up(reflect(state, attackerId, v)));
  return start(lastState)
    .to(updates(tryReflects))
    .stateHistory.slice(1);
}

/**
 * @deprecated
 * 戦闘フロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームステート
 */
export function deprecated_battleFlow(lastState: GameState, commands: [PlayerCommand, PlayerCommand]): GameState[] {
  const batteries = extractBatteryCommands(lastState, commands);
  if (!batteries) {
    return [];
  }

  return deprecated_gameFlow(lastState, [
    state => {
      const doneBatteryDeclaration = batteryDeclaration(
        state,
        batteries.attacker.playerId,
        batteries.attacker.command,
        batteries.defender.playerId,
        batteries.defender.command
      );
      if (!doneBatteryDeclaration) {
        return [];
      }

      const doneBattle = battle(
        up(doneBatteryDeclaration),
        doneBatteryDeclaration.effect.attacker,
        doneBatteryDeclaration.effect.attackerBattery,
        batteries.defender.playerId,
        doneBatteryDeclaration.effect.defenderBattery
      );
      if (!doneBattle) {
        return [];
      }

      return [
        up(doneBatteryDeclaration),
        up(doneBattle),
        ...deprecated_gameFlow(up(doneBattle), [
          state => canReflectFlow(doneBattle.effect.result)
            ? reflectFlow(state, doneBattle.effect.attacker)
            : [],
          state => {
            if (!canRightItself(doneBattle.effect)) {
              return [];
            }

            const done = rightItself(state, doneBattle.effect);
            return done ? [up(done)] : [];
          },
          state => {
            const endJudge = gameEndJudging(state);
            if (endJudge.type === 'GameContinue') {
              return gameContinueFlow(
                state,
                batteries.attacker.playerId,
                batteries.attacker.command,
                batteries.defender.playerId,
                batteries.defender.command
              );
            } else {
              const done = gameEnd(state, endJudge);
              return [up(done)];
            }
          }
        ])
      ];
    }
  ]);
}
