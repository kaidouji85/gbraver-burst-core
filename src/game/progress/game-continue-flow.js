// @flow

import type {BatteryCommand, Command, GameState, PlayerCommand, PlayerCommandX, PlayerId} from "../..";
import {gameFlow} from "../flow/game-flow";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {canContinuousActive, continuousActive} from "../../effect/continuous-active";
import {upcastGameState} from "../state/game-state";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";

/**
 * ゲーム継続フロー
 *
 * @param state 最新の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerCommand 攻撃側コマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderCommand 防御側コマンド
 * @return 更新結果
 */
export function gameContinueFlow(state: GameState, attackerId: PlayerId, attackerCommand: Command, defenderId: PlayerId, defenderCommand: Command): GameState[] {
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
    state => {
      const done = inputCommand(
        state,
        attackerId,
        attackerCommand,
        defenderId,
        defenderCommand
      );
      return done ? [upcastGameState(done)] : [];
    }
  ]);
}