import { Effect, EffectSchema } from "../../src";
import { validGameEnd } from "./game-end/valid-game-end";
import { validInputCommand } from "./input-command/valid-input-command";
import { validReflect } from "./reflect/valid-reflect";
import { validStartGame } from "./start-game/valid-start-game";

/** 有効なEffect */
const effects: Effect[] = [
  validStartGame,
  validGameEnd,
  validInputCommand,
  validReflect,
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