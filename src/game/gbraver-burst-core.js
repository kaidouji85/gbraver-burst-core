// @flow

import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "./command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";
import {isDuplicatePlayers} from "./is-duplicate-players";
import type {Player} from "../player/player";

/** ゲームコア部分 */
export class GbraverBurstCore {
  _players: [Player, Player];
  _stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param players バトルに参加するプレイヤー
   */
  constructor(players: [Player, Player]) {
    if (isDuplicatePlayers(players)) {
      throw new Error('duplicate players');
    }

    this._players = players;
    this._stateHistory = start(this._players);
  }

  /**
   * バトルに参加している全プレイヤーを取得する
   *
   * @return 取得結果
   */
  players(): [Player, Player] {
    return this._players;
  }

  /**
   * ゲームステート履歴を取得する
   *
   * @return 取得結果
   */
  stateHistory(): GameState[] {
    return this._stateHistory;
  }

  /**
   * ゲームを進行させる
   *
   * @param commands コマンド
   * @return 更新されたゲーム状態
   */
  progress(commands: [PlayerCommand, PlayerCommand]): GameState[] {
    const lastState = this._stateHistory[this._stateHistory.length - 1];
    if (!lastState) {
      throw new Error('ゲームステート履歴がありません');
    }
    const updated = progress(lastState, commands);
    this._stateHistory = [...this._stateHistory, ...updated];
    return updated;
  }
}