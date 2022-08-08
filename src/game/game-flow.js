// @flow
import type {GameState, GameStateX} from "../state/game-state";

/**
 * ゲームステート更新
 * @template X 更新前ゲームステートのゲーム効果
 * @template Y 更新後ゲームステートのゲーム効果
 * @param origin 更新前ゲームステート
 * @return 更新後ゲームステート
 */
type GameStateUpdater<X, Y> = (origin: GameStateX<X>) => GameStateX<Y>;

/**
 * ゲームステートチェイナー
 * @template X 最終ステートのゲーム効果
 */
interface GameStateChainer<X> {
  /**
   * ステートを更新する
   * @param updater 更新関数
   */
  chain<Y>(updater: GameStateUpdater<X, Y>): GameStateChainer<Y>;

  /**
   * ゲームステート履歴に変換する
   *
   * @return 変換結果
   */
  toGameStateHistory(): GameState[];
}
