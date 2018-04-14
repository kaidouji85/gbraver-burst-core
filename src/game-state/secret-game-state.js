// @flow
import type {SecretPlayerState} from "./secret-player-state";

/**
 * 特定ユーザに公開するゲーム状態
 * ユーザのコマンド入力内容などが格納される
 */
export type SecretGameState = {
  players: SecretPlayerState[]
};