// @flow

import type {GameState} from '../../state/game-state';
import {upcastGameState as up} from "../../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {canRightItself, rightItself} from "../../effect/right-itself";
import type {PlayerCommandX} from "../command/player-command";
import type {BatteryCommand} from "../../command/battery";
import {start} from "../game-flow/start";
import {addHistory as add, chain} from "../game-flow/chain";
import type {BattleResult} from "../../effect/battle/result/battle-result";
import type {PlayerId} from "../../player/player";
import type {TryReflect} from "../../state/armdozer-effect";
import {toReflectParam} from "../../effect/reflect/reflect";
import {reflect} from "../../effect/reflect";
import {updates} from "../game-flow/updates";
import {addHistories as addM} from "../game-flow/arrays";
import type {Command} from "../../command/command";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {canContinuousActive, continuousActive} from "../../effect/continuous-active";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";
import {upcastGameFlow as upf} from "../game-flow/game-flow";

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

  return start(lastState)
    .to(chain(v => batteryDeclaration(v, attacker.playerId, attacker.command,
      defender.playerId, defender.command)))
    .to(chain(v => battle(up(v), v.effect.attacker, v.effect.attackerBattery,
      defender.playerId, v.effect.defenderBattery)))
    .to(battle =>battle
        .to(v => canReflectFlow(v.lastState.effect.result)
          ? addM(v, reflectFlow(up(v.lastState), attacker.playerId))
          : upf(v))
        .to(v => canRightItself(battle.lastState.effect)
          ? upf(add(v, rightItself(v.lastState, battle.lastState.effect)))
          : v))
    .to(v => {
      const lastState = up(v.lastState);
      const endJudge = gameEndJudging(lastState);
      if (endJudge.type === 'GameContinue') {
        return addM(v, gameContinueFlow(lastState, attacker.playerId, attacker.command,
          defender.playerId, defender.command));
      } else {
        return add(v, up(gameEnd(lastState, endJudge)));
      }
    }).stateHistory.slice(1);
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
 * ダメージ反射フロー
 * 
 * @param lastState 最新のゲームステート
 * @param attackerId 攻撃側のプレイヤーID
 * @return 更新結果
 */
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
  return start(state)
    .to(chain(v => up(updateRemainingTurn(v))))
    .to(v => canContinuousActive(v.lastState)
      ? add(v, up(continuousActive(v.lastState)))
      : add(v, up(turnChange(v.lastState))))
    .to(chain(v => inputCommand(v, attackerId, attackerCommand, defenderId, defenderCommand)))
    .stateHistory.slice(1);
}