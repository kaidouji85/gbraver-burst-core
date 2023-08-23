import { GameContinue, parseGameContinue } from "../../../src";

/** 有効なGameContinue */
const gameContinue: GameContinue = {
  type: "GameContinue",
};

test("GameContinueはパースできる", () => {
  expect(parseGameContinue(gameContinue)).toEqual(gameContinue);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(gameContinue);
  const data = JSON.parse(str);
  expect(parseGameContinue(data)).toEqual(gameContinue);
});

test("GameContinue以外はパースできない", () => {
  const data = {
    name: "GameContinue",
  };
  expect(parseGameContinue(data)).toBeNull();
});
