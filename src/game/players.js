// @flow

import type {Player} from "../player/player";

/** ゲームに参加しているプレイヤー */
export type Players = [Player, Player];

/**
 * プレイヤーが重複しているか否かを判定する
 *
 * @param players ゲーム参加プレイヤー
 * @return 判定結果、trueでプレイヤーが重複している
 */
export function isDuplicatePlayers(players: Players): boolean {
  return players[0].playerId === players[1].playerId;
}