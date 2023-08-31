import { GameEndJudging, GameEndJudgingSchema } from "../../../src";

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
    expect(GameEndJudgingSchema.parse(gameEndJudging)).toEqual(gameEndJudging);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  gameEndJudges.forEach((gameEndJudging) => {
    const str = JSON.stringify(gameEndJudging);
    const data = JSON.parse(str);
    expect(GameEndJudgingSchema.parse(data)).toEqual(gameEndJudging);
  });
});

test("GameEndJudging以外はパースできない", () => {
  const data = {
    name: "GameEndJudging",
  };
  expect(() => GameEndJudgingSchema.parse(data)).toThrow();
});
