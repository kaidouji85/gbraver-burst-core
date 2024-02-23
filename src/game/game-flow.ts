import { EMPTY_GAME_STATE } from "../empty/game-state";
import { GameState } from "../state/game-state";

/**
 * ステートヒストリー追加関数
 * @param state 最新のゲームステート
 * @return 追加されたゲームステート
 */
type AddStateHistory = (state: GameState) => GameState[];

/**
 * ゲームフローを開始する
 * 本関数は以下の呼ばれ方を想定している
 *
 * (1)ゲーム開始のように最新ステートがない場合
 * startGameFlow([
 *   () => [startGame(players)],      // 最初の関数には最新ステートがないため引数なし
 *   (state) => [anyEffect(state)],   // ２個目以降からstateを引数によってよい
 *   // ...
 * ]);                                // 最新ステートがないので引数lastStateは指定しない
 *
 * (2)それ以外の場合
 * startGameFlow([
 *   (state) => [anyEffectX(state)],  // 最初の関数には最新ステートがあるため引数あり
 *   (state) => [anyEffectY(state)],
 *   // ...
 * ], lastState);                     // かならず最新ステートを引数に渡す
 *
 * @param fns ステートヒストリー追加関数を順に適用する
 * @param lastState フロー開始前の最新ステート、指定されない場合はEMPTY_GAME_STATEがセットされる
 * @return 本フローで追加されたゲームステート
 */
export const startGameFlow = (
  fns: AddStateHistory[],
  lastState?: GameState,
): GameState[] =>
  fns.reduce((stateHistory: GameState[], fn: AddStateHistory) => {
    const state = stateHistory.at(-1) ?? lastState ?? EMPTY_GAME_STATE;
    return [...stateHistory, ...fn(state)];
  }, []);
