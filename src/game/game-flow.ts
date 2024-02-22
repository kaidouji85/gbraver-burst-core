import { EMPTY_GAME_STATE } from "../empty/game-state";
import { GameState } from "../state/game-state";

type AddStateHistory = (state: GameState) => GameState[];

export const startGameFlow = (
  fns: AddStateHistory[],
  lastState?: GameState,
): GameState[] =>
  fns.reduce((stateHistory: GameState[], fn: AddStateHistory) => {
    const state = stateHistory.at(-1) ?? lastState ?? EMPTY_GAME_STATE;
    return [...stateHistory, ...fn(state)];
  }, []);
