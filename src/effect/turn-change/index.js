// @flow

import type {GameState} from "../../game/state/game-state";
import type {PlayerState} from "../../game/state/player-state";
import {getRecoveredBattery} from "./get-recovered-battery";
import {getNextActivePlayer} from "./next-active-player";

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
