// @flow

import type {Player} from "../../player/player";

/**
 * プレイヤーが重複しているか否かを判定する
 *
 * @param players ゲーム参加プレイヤー
 * @return 判定結果、trueでプレイヤーが重複している
 */
export function isDuplicatePlayers(players: [Player, Player]): boolean {
  return players[0].playerId === players[1].playerId;
}