import { GameEnd, GameEndSchema } from "../../../src";

/** 有効なGameEnd */
const gameEnd: GameEnd = {
  name: "GameEnd",
  result: {
    type: "GameOver",
    winner: "player",
  },
};

test("GameEndはパースできる", () => {
  expect(GameEndSchema.parse(gameEnd)).toEqual(gameEnd);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameEnd);
  const data = JSON.parse(str);
  expect(GameEndSchema.parse(data)).toEqual(gameEnd);
});

test("GameEnd以外はパースできない", () => {
  const data = {
    name: "GameEnd",
  };
  expect(() => GameEndSchema.parse(data)).toThrow();
});
