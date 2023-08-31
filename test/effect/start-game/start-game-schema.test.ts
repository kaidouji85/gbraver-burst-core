import { StartGameSchema } from "../../../src";
import { validStartGame } from "./valid-start-game";

test("StartGameはパースできる", () => {
  expect(StartGameSchema.parse(validStartGame)).toEqual(validStartGame);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validStartGame);
  const data = JSON.parse(str);
  expect(StartGameSchema.parse(data)).toEqual(validStartGame);
});

test("StartGame以外はパースできない", () => {
  const data = {
    type: "StartGame",
  };
  expect(() => StartGameSchema.parse(data)).toThrow();
});
