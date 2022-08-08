// @flow
import type {Battle} from "../../effect/battle/battle";
import type {GameState} from '../../state/game-state';
import {upcastGameState} from "../../state/game-state";
import {batteryDeclaration} from "../../effect/battery-declaration";
import {battle} from "../../effect/battle";
import {gameEndJudging} from "../end-judging";
import {gameEnd} from "../../effect/game-end";
import {canRightItself, rightItself} from "../../effect/right-itself";
import type {PlayerCommandX} from "../command/player-command";
import type {BatteryCommand} from "../../command/battery";
import {startGameStateFlow, startGameStateChainer} from "../game-state-flow";
import type {BattleResult} from "../../effect/battle/result/battle-result";
import type {PlayerId} from "../../player/player";
import type {TryReflect} from "../../state/armdozer-effect";
import {toReflectParam} from "../../effect/reflect/reflect";
import type {ReflectParam} from "../../effect/reflect/reflect";
import {reflect} from "../../effect/reflect";
import type {Command} from "../../command/command";
import {updateRemainingTurn} from "../../effect/update-remaning-turn";
import {canContinuousActive, continuousActive} from "../../effect/continuous-active";
import {turnChange} from "../../effect/turn-change";
import {inputCommand} from "../../effect/input-command";

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

  return startGameStateFlow(attackFlow(lastState, attacker, defender))
    .update(state => {
      const battleEffect = (state.effect.name === 'Battle') ? (state.effect: Battle) : null;
      return battleEffect
        ? startGameStateFlow([state])
          .update(state => canReflectFlow(battleEffect.result) ? reflectFlow(state, attacker.playerId) : [])
          .update(state => canRightItself(battleEffect) ? [upcastGameState(rightItself(state, battleEffect))] : [])
          .toGameStateHistory().slice(1)
        : [];
    })
    .update(state => {
      const endJudge = gameEndJudging(state);
      return endJudge.type === 'GameContinue'
        ? gameContinueFlow(state, attacker.playerId, attacker.command, defender.playerId, defender.command)
        : [upcastGameState(gameEnd(state, endJudge))]
    })
    .toGameStateHistory();
}

// TODO テストを作成する
/**
 * プレイヤー攻撃フロー
 *
 * @param lastState 最終ステート
 * @param attacker 攻撃側バッテリーコマンド
 * @param defender 防御側バッテリーコマンド
 * @return 更新されたゲームステート
 */
export function attackFlow(lastState: GameState, attacker: PlayerCommandX<BatteryCommand>, defender: PlayerCommandX<BatteryCommand>): GameState[] {
  return startGameStateChainer(lastState)
    .chain(state => batteryDeclaration(state, attacker.playerId, attacker.command,
      defender.playerId, defender.command))
    .chain(state => battle(upcastGameState(state), state.effect.attacker, state.effect.attackerBattery,
      defender.playerId, state.effect.defenderBattery))
    .toGameStateHistory().slice(1);
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

  const reflectParams = defender.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => ((v: any): TryReflect))
    .map(v => toReflectParam(v))
  return reflectParams.reduce((stateHistory: GameState[], reflectParam: ReflectParam) => {
    const state = stateHistory[stateHistory.length - 1] ?? lastState;
    return [...stateHistory, upcastGameState(reflect(state, attackerId, reflectParam))];
  }, []);
}

/**
 * ゲーム継続フロー
 *
 * @param lastState 最新の状態
 * @param attackerId 攻撃側プレイヤーID
 * @param attackerCommand 攻撃側コマンド
 * @param defenderId 防御側プレイヤーID
 * @param defenderCommand 防御側コマンド
 * @return 更新結果
 */
export function gameContinueFlow(lastState: GameState, attackerId: PlayerId, attackerCommand: Command, defenderId: PlayerId, defenderCommand: Command): GameState[] {
  return startGameStateFlow([upcastGameState(updateRemainingTurn(lastState))])
    .update(state => canContinuousActive(state)
      ? [upcastGameState(continuousActive(state))]
      : [upcastGameState(turnChange(state))]
    )
    .update(state => [upcastGameState(inputCommand(state, attackerId, attackerCommand, defenderId, defenderCommand))])
    .toGameStateHistory();
}