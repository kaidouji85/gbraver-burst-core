// @flow

import {deprecated_gameFlow} from "../deprecated-flow/game-flow";
import type {GameState} from '../../state/game-state';
import {upcastGameState} from "../../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {canRightItself, rightItself} from "../../effect/right-itself";
import {canReflectFlow, reflectFlow} from "./reflect-flow";
import {extractBatteryCommands} from "./extract-battery-commands";
import type {PlayerCommand} from "../command/player-command";
import {gameContinueFlow} from "./game-continue-flow";

/**
 * 戦闘フロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームステート
 */
export function battleFlow(lastState: GameState, commands: [PlayerCommand, PlayerCommand]): GameState[] {
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
        upcastGameState(doneBatteryDeclaration),
        doneBatteryDeclaration.effect.attacker,
        doneBatteryDeclaration.effect.attackerBattery,
        batteries.defender.playerId,
        doneBatteryDeclaration.effect.defenderBattery
      );
      if (!doneBattle) {
        return [];
      }

      return [
        upcastGameState(doneBatteryDeclaration),
        upcastGameState(doneBattle),
        ...deprecated_gameFlow(upcastGameState(doneBattle), [
          state => canReflectFlow(doneBattle.effect.result)
            ? reflectFlow(state, doneBattle.effect.attacker)
            : [],
          state => {
            if (!canRightItself(doneBattle.effect)) {
              return [];
            }

            const done = rightItself(state, doneBattle.effect);
            return done ? [upcastGameState(done)] : [];
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
              return [upcastGameState(done)];
            }
          }
        ])
      ];
    }
  ]);
}
