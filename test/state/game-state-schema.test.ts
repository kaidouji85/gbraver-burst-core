import { EMPTY_GAME_STATE, GameStateSchema } from "../../src";

test("GameStateはパースできる", () => {
  expect(GameStateSchema.parse(EMPTY_GAME_STATE)).toEqual(EMPTY_GAME_STATE);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(EMPTY_GAME_STATE);
  const data = JSON.parse(str);
  expect(GameStateSchema.parse(data)).toEqual(EMPTY_GAME_STATE);
});

test("GameState以外はパースできない", () => {
  const data = {
    players: [],
    activePlayerId: "invalid-player",
    effect: {
      type: "dummy",
    },
  };
  expect(() => GameStateSchema.parse(data)).toThrow();
});
