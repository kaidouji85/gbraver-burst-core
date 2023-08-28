import { Effect, EffectSchema } from "../../src";
import { validGameEnd } from "./game-end/valid-game-end";
import { validStartGame } from "./start-game/valid-start-game";

/** 有効なEffect */
const effects: Effect[] = [
  validStartGame,
  validGameEnd,
];

test("Effectはパースできる", () => {
  effects.forEach(effect => {
    expect(EffectSchema.parse(effect)).toEqual(effect);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  effects.forEach(effect => {
    const str = JSON.stringify(effect);
    const data = JSON.parse(str);
    expect(EffectSchema.parse(data)).toEqual(effect);
  });
});

test("Effect以外はパースできない", () => {
  const data = {
    type: "StartGame",
  };
  expect(() => EffectSchema.parse(data)).toThrow();
});