// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerId} from '../../player/player';
import type {ReflectDamageEffect, ReflectParam} from './reflect';
import {isPlayerDeath} from "../../game/state/player-state";

/**
 * ダメージ反射を実行する
 *
 * @param lastState 最新状態
 * @param damagedPlayerId ダメージを受けるプレイヤー
 * @param reflect ダメージ反射パラメータ
 * @return 更新結果
 */
export function reflect(lastState: GameState, damagedPlayerId: PlayerId, reflect: ReflectParam): GameState {
  const target = lastState.players.find(v => v.playerId === damagedPlayerId);
  if (!target) {
    return lastState;
  }

  const updated = {
    ...target,
    armdozer: {
      ...target.armdozer,
      hp: target.armdozer.hp - reflect.damage
    }
  };
  const players = lastState.players.map(v => {
    if (v.playerId === updated.playerId) {
      return updated;
    } else {
      return v;
    }
  });

  return {
    ...lastState,
    players: players,
    effect: {
      name: 'Reflect',
      damagedPlayer: damagedPlayerId,
      damage: reflect.damage,
      effect: reflect.effect,
      isDeath: isPlayerDeath(updated),
    }
  };
}