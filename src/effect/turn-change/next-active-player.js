// @flow

import type {GameState, PlayerState} from "../..";

/**
 * 次のアクティブプレイヤーを取得する
 * アクティブプレイヤーが存在しない場合はnullを返す
 *
 * @param lastState 最新状態
 * @return 次のアクティブプレイヤー
 */
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