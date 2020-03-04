// @flow

import type {Player} from "../player/player";
import type {GameState} from "../state/game-state";
import type {PlayerCommand} from "../player/command/player-command";
import {start} from "./start/start";
import {progress} from "./progress";

/**
 * Gブレイバーバーストのコア
 *
 */
export class GbraverBurstCore {
  /**
   * ゲームの初期状態を生成する
   *
   * @param player1 プレイヤー1
   * @param player2 プレイヤー2
   * @return ゲーム初期状態
   */
  start(player1: Player, player2: Player): GameState[] {
    return start(player1, player2);
  }

  /**
   * ゲームを進める
   *
   * @param lastState 最後の状態
   * @param commands コマンド
   * @return 更新されたゲーム状態
   */
  progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
    return progress(lastState, commands);
  }
}