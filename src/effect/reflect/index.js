// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerId} from '../../player/player';
import type {ReflectDamageEffect} from './reflect';
import {isPlayerDeath} from "../../state/player-state";

/**
 * ダメージ反射を実行
 *
 * @param lastState 最新状態
 * @param damagedPlayerId ダメージを受けるプレイヤー
 * @param damage ダメージの値
 * @param effect ダメージエフェクト
 * @return 更新結果
 */
export function reflect(lastState: GameState, damagedPlayerId: PlayerId, damage: number, effect: ReflectDamageEffect): GameState {
  const target = lastState.players.find(v => v.playerId);
  if (!target) {
    return lastState;
  }

  const updated = {
    ...target,
    armdozer: {
      ...target.armdozer,
      hp: target.armdozer.hp - damage
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
      damage: damage,
      effect: effect,
      isDeath: isPlayerDeath(updated),
    }
  };
}