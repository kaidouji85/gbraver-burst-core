import { GameEnd } from "../../../src/effect/game-end/game-end";

/** 有効なGameEnd */
export const validGameEnd: GameEnd = {
  name: "GameEnd",
  result: {
    type: "GameOver",
    winner: "player",
  },
};
