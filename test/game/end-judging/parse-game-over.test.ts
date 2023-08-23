import { GameOver, parseGameOver } from "../../../src";

/** 有効なGameOver */
const gameOver: GameOver = {
  type: "GameOver",
  winner: "winner-player",
};

test("GameOverはパースできる", () => {
  expect(parseGameOver(gameOver)).toEqual(gameOver);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameOver);
  const data = JSON.parse(str);
  expect(parseGameOver(data)).toEqual(gameOver);
});

test("GameOver以外はパースできない", () => {
  const data = {
    name: "GameOver",
    winnerPlayer: "winner-player",
  };
  expect(parseGameOver(data)).toBeNull();
});
