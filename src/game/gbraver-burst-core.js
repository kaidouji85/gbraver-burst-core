// @flow

import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "./command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";
import {isDuplicatePlayers} from "../player/game-players";
import type {GamePlayers} from "../player/game-players";

/** ゲームコア部分 */
export class GbraverBurstCore {
  _players: GamePlayers;
  _stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param players バトルに参加するプレイヤー
   */
  constructor(players: GamePlayers) {
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
  players(): GamePlayers {
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