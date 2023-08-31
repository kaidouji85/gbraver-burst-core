import { GameEndSchema } from "../../../src";
import { validGameEnd } from "./valid-game-end";

test("GameEndはパースできる", () => {
  expect(GameEndSchema.parse(validGameEnd)).toEqual(validGameEnd);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validGameEnd);
  const data = JSON.parse(str);
  expect(GameEndSchema.parse(data)).toEqual(validGameEnd);
});

test("GameEnd以外はパースできない", () => {
  const data = {
    name: "GameEnd",
  };
  expect(() => GameEndSchema.parse(data)).toThrow();
});
