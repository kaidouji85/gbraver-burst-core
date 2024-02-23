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
