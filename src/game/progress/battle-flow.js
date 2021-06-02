// @flow

import {deprecated_gameFlow} from "../deprecated-flow/game-flow";
import type {GameState} from '../../state/game-state';
import {upcastGameState as up} from "../../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {canRightItself, rightItself} from "../../effect/right-itself";
import {canReflectFlow, reflectFlow} from "./reflect-flow";
import {extractBatteryCommands} from "./extract-battery-commands";
import type {PlayerCommand, PlayerCommandX} from "../command/player-command";
import {gameContinueFlow} from "./game-continue-flow";
import type {BatteryCommand} from "../../command/battery";
import {start} from "../game-flow/start";
import {chain} from "../game-flow/chain";

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
