import { GameEnd } from "../../../src";

/** 有効なGameEnd */
export const validGameEnd: GameEnd = {
  name: "GameEnd",
  result: {
    type: "GameOver",
    winner: "player",
  },
};