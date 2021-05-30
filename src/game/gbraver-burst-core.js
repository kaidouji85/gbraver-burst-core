// @flow

import type {Player} from "../player/player";
import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "./command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";

export type Players = [Player, Player];

/** ゲームコア部分 */
export class GbraverBurstCore {
  _players: Players;
  _stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param players バトルに参加するプレイヤー
   */
  constructor(players: Players) {
    this._players = players;
    this._stateHistory = start(this._players[0], this._players[1]);
  }

  /**
   * バトルに参加している全プレイヤーを取得する
   *
   * @return 取得結果
   */
  players(): Players {
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
    const updated = progress(lastState, commands.map(v => v));
    this._stateHistory = [...this._stateHistory, ...updated];
    return updated;
  }
}