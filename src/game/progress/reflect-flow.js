// @flow
import type {BattleResult, GameState, PlayerId, TryReflect} from "../..";
import type {ReflectParam} from "../../effect/reflect/reflect";
import {toReflectParam} from "../../effect/reflect/reflect";
import {gameFlow} from "../flow/game-flow";
import {reflect} from "../../effect/reflect";
import {upcastGameState} from "../../state/game-state";

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
 * ダメージ反射のフロー
 * 本フローは戦闘直後に呼ばれる想定である
 *
 * @param lastState 最新状態
 * @param attackerId 攻撃側プレイヤーID
 * @return 更新結果
 */
export function reflectFlow(lastState: GameState, attackerId: PlayerId): GameState[] {
  const defender = lastState.players.find(v => v.playerId !== attackerId);
  if (!defender) {
    return [];
  }

  const tryReflects: ReflectParam[] = defender.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => ((v: any): TryReflect))
    .map(v => toReflectParam(v));
  return gameFlow(lastState, tryReflects.map(v => state => {
    const updated = reflect(state, attackerId, v);
    return updated ? [upcastGameState(updated)] : [];
  }));
}