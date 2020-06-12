// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerState} from "../../game/state/player-state";
import {getRecoveredBattery} from "./get-recovered-battery";
import type {ArmdozerEffect} from "../..";

/** ターンチェンジの際に回復するバッテリー */
export const BATTERY_RECOVERY_VALUE = 3;

/**
 * ターンチェンジを実行する
 *
 * @param lastState 更新前のゲームステート
 * @return ターンチェンジ後のゲームステート
 */
export function turnChange(lastState: GameState): GameState {
  const activePlayer = lastState.players.find(v => v.playerId === lastState.activePlayerId);
  const notActivePlayer = lastState.players.find(v => v.playerId !== lastState.activePlayerId);
  if (!activePlayer || !notActivePlayer) {
    return lastState;
  }

  const isContinuousTurn = hasContinuousActivePlayer(activePlayer);
  const nextActivePlayer = isContinuousTurn
    ? activePlayer
    : notActivePlayer;
  const updatedBattery = getRecoveredBattery(
    nextActivePlayer.armdozer.battery,
    nextActivePlayer.armdozer.maxBattery,
    BATTERY_RECOVERY_VALUE
  );
  const updatedEffects: ArmdozerEffect[] = isContinuousTurn
    ? removeContinuousActive(nextActivePlayer.armdozer.effects)
    : nextActivePlayer.armdozer.effects;
  const updatedNextActivePlayer = {
    ...nextActivePlayer,
    armdozer: {
      ...nextActivePlayer.armdozer,
      battery: updatedBattery,
      effects: updatedEffects
    }
  };
  const updatedPlayerList = lastState.players.map(player =>
    (player.playerId === updatedNextActivePlayer.playerId)
      ? updatedNextActivePlayer
      : player
  );

  return {
    ...lastState,
    activePlayerId: updatedNextActivePlayer.playerId,
    players: updatedPlayerList,
    effect: {name: 'TurnChange'}
  };
}

/**
 * 指定したプレイヤーがアクティブプレイヤー継続を持っているか否かを判定する
 *
 * @param player 判定対象
 * @return 判定結果、trueでアクティブプレイヤー継続を持っている
 */
function hasContinuousActivePlayer(player: PlayerState): boolean {
  return player.armdozer.effects
    .filter(v => v.type === 'ContinuousActivePlayer')
    .length > 0;
}

/**
 * アクティブプレイヤー継続を取り除く
 *
 * @param origin 処理対象
 * @return 処理結果
 */
function removeContinuousActive(origin: ArmdozerEffect[]): ArmdozerEffect[] {
  const removeTarget = origin.find(v => v.type === 'ContinuousActive');
  if (!removeTarget) {
    return origin;
  }

  return origin.filter(v => v!== removeTarget);
}