// @flow

import type {GameState, PlayerState} from "../..";
import {isRemainArmdozerEffect, updateArmdozerEffect} from "./armdozer-effect";

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

  const endArmdozerEffects = lastState.players
    .map((player: PlayerState) => ({
      playerId: player.playerId,
      effects: player.armdozer.effects
        .map(v => updateArmdozerEffect(v))
        .filter(v => !isRemainArmdozerEffect(v))
    }));

  return {
    ...lastState,
    players: updatePlayers,
    effect: {
      name: 'UpdateRemainingTurn',
      endArmdozerEffects: endArmdozerEffects
    }
  };
}

