// @flow
import type {GameState} from "../game-state/game-state";
import type {PlayerCommand} from "../command/player-command";
import {doBattle} from "./battle";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param command1 プレイヤー1のコマンド
 * @param command2 プレイヤー2のコマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[]): GameState[] {
  // TODO 戦闘、バーストの分岐を作る
  return doBattle(lastState, commands);
}
