import type {PlayerId} from "../../player/player";

/**
 * 次ターンのアクティブプレイヤーを取得する
 *
 * @param activePlayer 現在のアクティブプレイヤー
 * @param playerIdList ゲームに参加しているプレイヤーのリスト
 * @return 次ターンのアクティブプレイヤー
 */
export function getNextActivePlayer(activePlayer: PlayerId, playerIdList: PlayerId[]): PlayerId {
  const notActivePlayer = playerIdList.filter(v => v !== activePlayer);
  if (notActivePlayer.length !== 1) {
    return '';
  }
  return notActivePlayer[0];
}