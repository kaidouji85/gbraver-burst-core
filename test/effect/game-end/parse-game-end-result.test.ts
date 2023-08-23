import { GameEndResult, parseGameEndResult } from "../../../src";

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
    expect(parseGameEndResult(gameEndResult)).toEqual(gameEndResult);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  gameEndResults.forEach((gameEndResult) => {
    const str = JSON.stringify(gameEndResult);
    const data = JSON.parse(str);
    expect(parseGameEndResult(data)).toEqual(gameEndResult);
  });
});

test("GameEndResult以外はパースできない", () => {
  const data = {
    name: "GameEndResult",
  };
  expect(parseGameEndResult(data)).toBeNull();
});
