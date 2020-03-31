// @flow

import type {ArmdozerEffect, GameState, PlayerState} from "../..";

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

/**
 * アームドーザ効果の継続ターン数を更新する
 *
 * @param effect 更新前
 * @return 更新結果
 */
export function updateArmdozerEffect(effect: ArmdozerEffect): ArmdozerEffect {
  return {
    ...effect,
    remainingTurn: effect.remainingTurn - 1
  };
}

/**
 * アームドーザ効果が継続するか否かを判定する、trueで継続する
 *
 * @param effect 判定対象
 * @return 判定結果
 */
export function isRemainArmdozerEffect(effect: ArmdozerEffect): boolean {
  return 0 < effect.remainingTurn;
}
