// @flow

import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "./command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";
import {isDuplicatePlayers} from "./validation/is-duplicate-players";
import type {Player} from "../player/player";
import {isAllPlayerEnteredCommand} from "./validation/is-all-player-entered-command";

/** ゲームを再開するためのデータ */
export type GbraverBurstCoreRestore = {
  /** プレイヤー情報 */
  players: [Player, Player];
  /** ステートヒストリー */
  stateHistory: GameState[];
};

/** Gブレイバーバーストコア */
export interface GbraverBurstCore {
  /**
   * バトルに参加している全プレイヤーを取得する
   *
   * @return 取得結果
   */
  players(): [Player, Player];

  /**
   * ゲームステート履歴を取得する
   *
   * @return 取得結果
   */
  stateHistory(): GameState[];

  /**
   * 現在の状態をダンプする
   *
   * @return ダンプしたデータ
   */
  dump(): GbraverBurstCoreRestore;

  /**
   * ゲームを進行させる
   *
   * @param commands コマンド
   * @return 更新されたゲーム状態
   */
  progress(commands: [PlayerCommand, PlayerCommand]): GameState[];
}

/**
 * Gブレイバーバーストを開始する
 *
 * @param players プレイヤー情報
 * @return Gブレイバーバースト
 */
export function startGbraverBurst(players: [Player, Player]): GbraverBurstCore {
  if (isDuplicatePlayers(players)) {
    throw new Error('duplicate players');
  }

  const stateHistory = start(players);
  return new GbraverBurstCoreImpl(players, stateHistory);
}

/**
 * Gブレイバーバーストを再開する
 *
 * @param data 再開するデータ
 * @return Gブレイバーバースト
 */
export function restoreGbraverBurst(data: GbraverBurstCoreRestore): GbraverBurstCore {
  return new GbraverBurstCoreImpl(data.players, data.stateHistory);
}

/** Gブレイバーバーストコア実装 */
class GbraverBurstCoreImpl implements GbraverBurstCore {
  _players: [Player, Player];
  _stateHistory: GameState[];

  /**
   * コンストラクタ
   *
   * @param players バトルに参加するプレイヤー
   * @param stateHistory ステートヒストリー
   */
  constructor(players: [Player, Player], stateHistory: GameState[]) {
    this._players = players;
    this._stateHistory = stateHistory;
  }

  /** @override */
  players(): [Player, Player] {
    return this._players;
  }

  /** @override */
  stateHistory(): GameState[] {
    return this._stateHistory;
  }

  /** @override */
  dump(): GbraverBurstCoreRestore {
    return {players: this._players, stateHistory: this._stateHistory};
  }

  /** @override */
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