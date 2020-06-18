// @flow

import type {GameState} from "../../game/state/game-state";
import {BATTERY_RECOVERY_VALUE, turnChangeRecoverBattery} from "./recover-battery";
import type {ArmdozerEffect} from "../..";
import {hasContinuousActivePlayer, removeContinuousActive} from "./continuous-active";

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
  const recoverBattery = isContinuousTurn
    ? 0
    : BATTERY_RECOVERY_VALUE;
  const updatedBattery = turnChangeRecoverBattery(
    nextActivePlayer.armdozer.battery,
    nextActivePlayer.armdozer.maxBattery,
    recoverBattery
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
    effect: {
      name: 'TurnChange',
      recoverBattery: recoverBattery
    }
  };
}