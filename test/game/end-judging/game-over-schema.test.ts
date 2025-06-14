import {
  GameOver,
  GameOverSchema,
} from "../../../src/game/end-judging/game-end-judging";

/** 有効なGameOver */
const gameOver: GameOver = {
  type: "GameOver",
  winner: "winner-player",
};

test("GameOverはパースできる", () => {
  expect(GameOverSchema.parse(gameOver)).toEqual(gameOver);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameOver);
  const data = JSON.parse(str);
  expect(GameOverSchema.parse(data)).toEqual(gameOver);
});

test("GameOver以外はパースできない", () => {
  const data = {
    name: "GameOver",
    winnerPlayer: "winner-player",
  };
  expect(() => GameOverSchema.parse(data)).toThrow();
});
