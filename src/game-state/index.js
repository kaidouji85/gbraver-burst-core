import type {GameStateStep} from "./game-state-step";

/** 現在のゲーム状態 */
export type GameState = {
  steps: GameStateStep[]
};
