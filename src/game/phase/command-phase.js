import {GameState} from "../game-state";

/**
 * コマンドフェイズを実行する
 *
 * @param lastPhase 最新のゲーム状態
 * @return コマンドフェイズ実行結果
 */
export function doCommandPhase(lastPhase: GameState): GameState[] {
  return [{...lastPhase, phase: 'command'}];
}