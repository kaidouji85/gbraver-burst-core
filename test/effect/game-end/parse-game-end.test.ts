import { GameEnd } from "../../../src";
import { parseGameEnd } from "../../../src/effect/game-end/game-end";

/** 有効なGameEnd */
const gameEnd: GameEnd = {
  name: "GameEnd",
  result: {
    type: "GameOver",
    winner: "player",
  },
};

test("GameEndはパースできる", () => {
  expect(parseGameEnd(gameEnd)).toEqual(gameEnd);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameEnd);
  const data = JSON.parse(str);
  expect(parseGameEnd(data)).toEqual(gameEnd);
});

test("GameEnd以外はパースできない", () => {
  const data = {
    name: "GameEnd",
  };
  expect(parseGameEnd(data)).toBeNull();
});
