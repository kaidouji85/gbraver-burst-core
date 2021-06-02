// @flow
import type {ReflectParam} from "../../effect/reflect/reflect";
import {toReflectParam} from "../../effect/reflect/reflect";
import {deprecated_gameFlow} from "../deprecated-flow/game-flow";
import {reflect} from "../../effect/reflect";
import type {GameState} from "../../state/game-state";
import {upcastGameState} from "../../state/game-state";
import type {PlayerId} from "../../player/player";
import type {TryReflect} from "../../state/armdozer-effect";

/**
 * @deprecated
 * ダメージ反射のフロー
 * 本フローは戦闘直後に呼ばれる想定である
 *
 * @param lastState 最新状態
 * @param attackerId 攻撃側プレイヤーID
 * @return 更新結果
 */
export function deprecated_reflectFlow(lastState: GameState, attackerId: PlayerId): GameState[] {
  const defender = lastState.players.find(v => v.playerId !== attackerId);
  if (!defender) {
    return [];
  }

  const tryReflects: ReflectParam[] = defender.armdozer.effects
    .filter(v => v.type === 'TryReflect')
    .map(v => ((v: any): TryReflect))
    .map(v => toReflectParam(v));
  return deprecated_gameFlow(lastState, tryReflects.map(v => state => {
    const updated = reflect(state, attackerId, v);
    return updated ? [upcastGameState(updated)] : [];
  }));
}