// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerId} from '../../player/player';
import type {Reflect, ReflectParam} from './reflect';
import {isPlayerDeath} from "../../state/player-state";
import type {GameStateX} from "../..";
import {totalDamageDecrease} from "../../state/armdozer-effect";

/**
 * ダメージ反射を実行する
 * 実行できない場合はnullを返す
 *
 * @param lastState 最新状態
 * @param damagedPlayerId ダメージを受けるプレイヤー
 * @param reflect ダメージ反射パラメータ
 * @return 更新結果
 */
export function reflect(lastState: GameState, damagedPlayerId: PlayerId, reflect: ReflectParam): ?GameStateX<Reflect> {
  const target = lastState.players.find(v => v.playerId === damagedPlayerId);
  if (!target) {
    return null;
  }

  const damage = Math.max(
    reflect.damage - totalDamageDecrease(target.armdozer.effects),
    0
  );
  const updatedTarget = {
    ...target,
    armdozer: {
      ...target.armdozer,
      hp: target.armdozer.hp - damage
    }
  };
  const updatedPlayers = lastState.players
    .map(v => (v.playerId === updatedTarget.playerId) ? updatedTarget : v);

  const effect = {
    name: 'Reflect',
    damagedPlayer: damagedPlayerId,
    damage: damage,
    effect: reflect.effect,
    isDeath: isPlayerDeath(updatedTarget),
  };

  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect
  };
}