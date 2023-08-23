import { GameEndJudging, parseGameEndJudging } from "../../../src";

/** 有効なGameEndJudging */
const gameEndJudges: GameEndJudging[] = [
  {
    type: "GameOver",
    winner: "winner-player",
  },
  {
    type: "EvenMatch",
  },
  {
    type: "GameContinue",
  },
];

test("GameEndJudgingはパースできる", () => {
  gameEndJudges.forEach((gameEndJudging) => {
    expect(parseGameEndJudging(gameEndJudging)).toEqual(gameEndJudging);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  gameEndJudges.forEach((gameEndJudging) => {
    const str = JSON.stringify(gameEndJudging);
    const data = JSON.parse(str);
    expect(parseGameEndJudging(data)).toEqual(gameEndJudging);
  });
});

test("GameEndJudging以外はパースできない", () => {
  const data = {
    name: "GameEndJudging",
  };
  expect(parseGameEndJudging(data)).toBeNull();
});
