// @flow

import type {GameState, PlayerState} from "../..";
import {isRemainArmdozerEffect, updateArmdozerEffect} from "./armdozer-effect";
import type {EndArmdozerEffect} from "./update-remaining-turn";

/**
 * 効果継続ターン数を更新する
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function updateRemainingTurn(lastState: GameState): GameState {
  const updatePlayers = lastState.players.map(v => ({
    ...v,
    armdozer: {
      ...v.armdozer,
      effects: v.armdozer.effects
        .map(v => updateArmdozerEffect(v))
        .filter(v => isRemainArmdozerEffect(v))
    }
  }));

  const endArmdozerEffect: EndArmdozerEffect[] = lastState.players
    .map(player => player.armdozer.effects
      .map(effect => updateArmdozerEffect(effect))
      .filter(effect => !isRemainArmdozerEffect(effect))
      .map(effect => ({
        playerId: player.playerId,
        effect: effect
      }))
    ).reduce((a, b) => a.concat(b));

  return {
    ...lastState,
    players: updatePlayers,
    effect: {
      name: 'UpdateRemainingTurn',
      endArmdozerEffect: endArmdozerEffect
    }
  };
}

