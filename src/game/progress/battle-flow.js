// @flow

import {gameFlow} from "../flow/game-flow";
import type {GameState} from '../state/game-state';
import {upcastGameState} from "../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {canRightItself, rightItself} from "../../effect/right-itself";
import {canReflectFlow, reflectFlow} from "./reflect-flow";
import {extractBatteryCommands} from "./extract-battery-commands";
import type {PlayerCommand} from "../command/player-command";
import {canContinuousActive, continuousActive} from "../../effect/continuous-active";

/**
 * 戦闘フロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームステート
 */
export function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const batteryCommands = extractBatteryCommands(lastState, commands);
  if (!batteryCommands) {
    return [];
  }

  return gameFlow(lastState, [
    state => [batteryDeclaration(state, commands)],
    state => {
      const doneResult = battle(
        state,
        batteryCommands.attacker.playerId,
        batteryCommands.attacker.command,
        batteryCommands.defender.playerId,
        batteryCommands.defender.command
      );
      if (!doneResult) {
        return [];
      }

      const upcastedBattle: GameState = upcastGameState(doneResult);
      return [
        upcastedBattle,
        ...gameFlow(upcastedBattle, [
          state => canReflectFlow(doneResult.effect.result)
            ? reflectFlow(state, doneResult.effect.attacker)
            : [],
          state => canRightItself(doneResult.effect)
            ? [rightItself(state, doneResult.effect)]
            : [],
          state => {
            const endJudge = gameEndJudging(state);
            if (endJudge.type === 'GameContinue') {
              return gameFlow(state, [
                state => [updateRemainingTurn(state)],
                state => {
                  if(canContinuousActive(state)) {
                    const done = continuousActive(state);
                    return done ? [upcastGameState(done)] : [];
                  } else {
                    const done = turnChange(state);
                    return done ? [upcastGameState(done)] : [];
                  }
                },
                state => [inputCommand(state, commands)]
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

