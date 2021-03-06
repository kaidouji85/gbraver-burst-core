// @flow

import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "./command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";
import {isDuplicatePlayers} from "./validation/is-duplicate-players";
import type {Player} from "../player/player";
import {isAllPlayerEnteredCommand} from "./validation/is-all-player-entered-command";

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
    if (!isAllPlayerEnteredCommand(this._players, commands)) {
      throw new Error('all player not enter command');
    }

    const lastState = this._stateHistory[this._stateHistory.length - 1];
    if (!lastState) {
      throw new Error('no game state history');
    }

    const updated = progress(lastState, commands);
    this._stateHistory = [...this._stateHistory, ...updated];
    return updated;
  }
}
