// @flow

import type {GameState} from "../../state/game-state";
import {upcastGameState as up} from "../../state/game-state";
import {burst} from "../../effect/burst";
import {inputCommand} from "../../effect/input-command";
import {pilotSkill} from "../../effect/pilot-skill";
import type {PlayerCommand} from "../command/player-command";
import {start} from "../game-flow/start";
import {addHistory, chain} from "../game-flow/chain";

/**
 * 効果発動フローを行うか否かを判定する
 *
 * @param commands プレイヤーが選択したコマンド
 * @return 判定結果、trueでバーストフェイズを行う
 */
export function isEffectActivationFlow(commands: [PlayerCommand, PlayerCommand]): boolean {
  const types = commands.map(v => v.command.type);
  return types.includes('BURST_COMMAND') || types.includes('PILOT_SKILL_COMMAND');
}

/**
 * 効果発動フロー
 * 現状ではバースト、パイロットスキルを想定している
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function effectActivationFlow(lastState: GameState, commands: [PlayerCommand, PlayerCommand]): GameState[] {
  const attackerCommand = commands.find(v => v.playerId === lastState.activePlayerId);
  const defenderCommand = commands.find(v => v.playerId !== lastState.activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    throw new Error('not found attacker or defender command');
  }

  const flow = start(lastState)
    .to(v => {
      const done = activationOrNot(v.lastState, attackerCommand);
      return done ? addHistory(v, done) : v;
    })
    .to(v => {
      const done = activationOrNot(v.lastState, defenderCommand);
      return done ? addHistory(v, done) : v;
    })
    .to(chain(v => inputCommand(v, attackerCommand.playerId, attackerCommand.command,
      defenderCommand.playerId, defenderCommand.command))
    );

  // 本関数は更新結果だけを返すので、
  // ステートヒストリーの先頭は不要
  return flow.stateHistory.slice(1);
}

/**
 * コマンドに応じて 効果発動 or 何もしない
 * 何もしない場合はnullを返す
 *
 * @param state 最新のゲームステート
 * @param command コマンド
 * @return 更新結果
 */
export function activationOrNot(state: GameState, command: PlayerCommand): ?GameState {
  if (command.command.type === 'BURST_COMMAND') {
    return up(burst(state, command.playerId));
  }

  if (command.command.type === 'PILOT_SKILL_COMMAND') {
    return up(pilotSkill(state, command.playerId));
  }

  return null;
}
