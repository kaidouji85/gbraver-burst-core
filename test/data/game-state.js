// @flow

import type {GameState} from "../../src/game/state/game-state";

/** 空のゲームステート */
export const EMPTY_GAME_STATE: GameState = {
  players: [],
  activePlayerId: '',
  effect: {
    name: 'StartGame'
  },
};
