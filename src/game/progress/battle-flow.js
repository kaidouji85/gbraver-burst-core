// @flow

import {gameFlow} from "../flow/game-flow";
import type {Battle} from '../../effect/battle/battle';
import type {GameState} from '../state/game-state';
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import type {PlayerCommand, PlayerCommandX} from "../../command/command";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {rightItself} from "../../effect/right-itself";
import {canReflectFlow, reflectFlow} from "./reflect-flow";
import type {BatteryCommand} from "../..";
import {upcastGameState} from "../state/game-state";

/**
 * 戦闘のフロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function battleFlow(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  const attackerCommand = commands.find(v => v.playerId === lastState.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attackerCommand ||!defenderCommand) {
    return [];
  }

  if (attackerCommand.command.type !== 'BATTERY_COMMAND' || defenderCommand.command.type !== 'BATTERY_COMMAND') {
    return [];
  }

  const attackerBattery: PlayerCommandX<BatteryCommand> = {
    playerId: attackerCommand.playerId,
    command: attackerCommand.command
  };
  const defenderBattery: PlayerCommandX<BatteryCommand> = {
    playerId: defenderCommand.playerId,
    command: defenderCommand.command
  };
  return gameFlow(lastState, [
    state => [batteryDeclaration(state, commands)],
    state => {
      const doneResult = battle(state, attackerBattery, defenderBattery);
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
                state => [turnChange(state)],
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

/**
 * 体勢整えを実施するか否かを判定する、trueで実施する
 *
 * @param battle 戦闘情報
 * @return 判定結果
 */
export function canRightItself(battle: Battle): boolean {
  return !battle.isDeath;
}