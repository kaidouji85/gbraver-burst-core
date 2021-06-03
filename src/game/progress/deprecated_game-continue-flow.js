// @flow

import {deprecated_gameFlow} from "../deprecated-flow/game-flow";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {canContinuousActive, continuousActive} from "../../effect/continuous-active";
import {upcastGameState} from "../../state/game-state";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import type {PlayerId} from "../../player/player";
import type {GameState} from "../../state/game-state";
import type {Command} from "../../command/command";

/**
 * @deprecated
 * ゲーム継続フロー
 *
 * @param state 最新の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerCommand 攻撃側コマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderCommand 防御側コマンド
 * @return 更新結果
 */
export function deprecated_gameContinueFlow(state: GameState, attackerId: PlayerId, attackerCommand: Command, defenderId: PlayerId, defenderCommand: Command): GameState[] {
  return deprecated_gameFlow(state, [
    state => {
      const done = updateRemainingTurn(state);
      return done ? [upcastGameState(done)] : [];
    },
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