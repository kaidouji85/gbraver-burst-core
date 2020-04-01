// @flow

import type {GameState} from "../../state/game-state";
import type {PlayerState} from "../../state/player-state";
import {getNextActivePlayer} from "./next-active-player";
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
  const playerIdList = lastState.players.map(v => v.playerId);
  const nextActivePlayerId = getNextActivePlayer(lastState.activePlayerId, playerIdList);
  const updatedPlayerList = lastState.players.map(player => {
    const isNextActive = player.playerId === nextActivePlayerId;
    return isNextActive
      ? updateAttacker(player)
      : player;
  });

  return {
    ...lastState,
    activePlayerId: nextActivePlayerId,
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
