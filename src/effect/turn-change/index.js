// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerState} from "../../game/state/player-state";
import {getNotActivePlayer} from "./not-active-player";
import {getRecoveredBattery} from "./get-recovered-battery";

/** ターンチェンジの際に回復するバッテリー */
export const BATTERY_RECOVERY_VALUE = 3;

/**
 * ターンチェンジを実行する
 *
 * @param lastState 更新前のゲームステート
 * @return ターンチェンジ後のゲームステート
 */
export function turnChange(lastState: GameState): GameState {
  const nextActivePlayer = getNextActivePlayer(lastState);
  if (!nextActivePlayer) {
    return lastState;
  }

  const updatedPlayerList = lastState.players.map(player =>
    (player.playerId === nextActivePlayer.playerId)
      ? updateAttacker(player)
      : player
  );

  return {
    ...lastState,
    activePlayerId: nextActivePlayer.playerId,
    players: updatedPlayerList,
    effect: {name: 'TurnChange'}
  };
}

export function hasContinuousActivePlayer(player: PlayerState): boolean {
  return player.armdozer.effects
    .filter(v => v.type === 'ContinuousActivePlayer')
    .length > 0;
}

export function getNextActivePlayer(lastState: GameState): ?PlayerState {
  const activePlayer = lastState.players.find(v => v.playerId === lastState.activePlayerId);
  const notActivePlayer = lastState.players.find(v => v.playerId !== lastState.activePlayerId);
  if (!activePlayer || !notActivePlayer) {
    return null;
  }

  if (hasContinuousActivePlayer(activePlayer)) {
    return activePlayer;
  }

  return notActivePlayer;
}

/**
 * ターンチェンジ 攻撃側のステータス更新
 *
 * @param player 更新前の攻撃側ステート
 * @return 更新結果
 */
function updateAttacker(player: PlayerState): PlayerState {
  return {
    ...player,
    armdozer: {
      ...player.armdozer,
      battery: getRecoveredBattery(player.armdozer.battery, player.armdozer.maxBattery, BATTERY_RECOVERY_VALUE),
    }
  }
}
