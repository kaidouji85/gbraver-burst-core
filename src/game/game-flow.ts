import { GameState } from "../state/game-state";

/**
 * ステートヒストリー追加関数
 * @param state 最新のゲームステート
 * @return 追加されたゲームステート
 */
type AddStateHistory = (state: GameState) => GameState[];

/**
 * ゲームフローを開始する
 * @param lastState フロー開始前の最新ステート
 * @param addStateHistoryFunctions ステートヒストリー追加関数を順に適用する
 * @return 本フローで追加されたゲームステート
 */
export const startGameFlow = (
  lastState: GameState,
  addStateHistoryFunctions: AddStateHistory[],
): GameState[] =>
  addStateHistoryFunctions.reduce(
    (stateHistory: GameState[], fn: AddStateHistory) => {
      const state = stateHistory.at(-1) ?? lastState;
      return [...stateHistory, ...fn(state)];
    },
    [],
  );
