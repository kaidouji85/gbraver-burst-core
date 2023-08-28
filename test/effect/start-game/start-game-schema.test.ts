import { StartGame, StartGameSchema } from "../../../src";

/** 有効なStartGame */
const startGame: StartGame = {
  name: "StartGame",
};

test("StartGameはパースできる", () => {
  expect(StartGameSchema.parse(startGame)).toEqual(startGame);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(startGame);
  const data = JSON.parse(str);
  expect(StartGameSchema.parse(data)).toEqual(startGame);
});

test("StartGame以外はパースできない", () => {
  const data = {
    type: "StartGame",
  };
  expect(() => StartGameSchema.parse(data)).toThrow();
});
