import { GameContinue, GameContinueSchema } from "../../../src";

/** 有効なGameContinue */
const gameContinue: GameContinue = {
  type: "GameContinue",
};

test("GameContinueはパースできる", () => {
  expect(GameContinueSchema.parse(gameContinue)).toEqual(gameContinue);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameContinue);
  const data = JSON.parse(str);
  expect(GameContinueSchema.parse(data)).toEqual(gameContinue);
});

test("GameContinue以外はパースできない", () => {
  const data = {
    name: "GameContinue",
  };
  expect(() => GameContinueSchema.parse(data)).toThrow();
});
