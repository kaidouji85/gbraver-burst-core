// @flow
import type {SecretGameState} from "./secret-game-state";
import type {OpenGameState} from "./open-game-state";

/** ゲームの状態 */
export type GameState = {
  /** 全プレイヤーに公開可能な状態 */
  openState: OpenGameState,
  /** 特定のプレイヤーにしか公開しない状態 */
  secretState: SecretGameState
};