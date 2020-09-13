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
  const batteries = extractBatteryCommands(lastState, commands);
  if (!batteries) {
    return [];
  }

  return gameFlow(lastState, [
    state => {
      const done = batteryDeclaration(
        state,
        batteries.attacker.playerId,
        batteries.attacker.command,
        batteries.defender.playerId,
        batteries.defender.command
      );
      return done ? [upcastGameState(done)] : [];
    },
    state => {
      const doneBattle = battle(
        state,
        batteries.attacker.playerId,
        batteries.attacker.command,
        batteries.defender.playerId,
        batteries.defender.command
      );
      if (!doneBattle) {
        return [];
      }

      const upcastedBattle: GameState = upcastGameState(doneBattle);
      return [
        upcastedBattle,
        ...gameFlow(upcastedBattle, [
          state => canReflectFlow(doneBattle.effect.result)
            ? reflectFlow(state, doneBattle.effect.attacker)
            : [],
          state => canRightItself(doneBattle.effect)
            ? [rightItself(state, doneBattle.effect)]
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

