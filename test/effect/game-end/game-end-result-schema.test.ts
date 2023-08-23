import { GameEndResult, GameEndResultSchema } from "../../../src";

/** 有効なGameEndResult */
const gameEndResults: GameEndResult[] = [
  {
    type: "GameOver",
    winner: "winner-player",
  },
  {
    type: "EvenMatch",
  },
];

test("GameEndResultはパースできる", () => {
  gameEndResults.forEach((gameEndResult) => {
    expect(GameEndResultSchema.parse(gameEndResult)).toEqual(gameEndResult);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  gameEndResults.forEach((gameEndResult) => {
    const str = JSON.stringify(gameEndResult);
    const data = JSON.parse(str);
    expect(GameEndResultSchema.parse(data)).toEqual(gameEndResult);
  });
});

test("GameEndResult以外はパースできない", () => {
  const data = {
    name: "GameEndResult",
  };
  expect(() => GameEndResultSchema.parse(data)).toThrow();
});
