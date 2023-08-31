import { Effect, EffectSchema } from "../../src";
import { validBatteryDeclaration } from "./battery-declaration/valid-battery-declaration";
import { validBattle } from "./battle/valid-battle";
import { validBurstEffect } from "./burst/valid-burst-effect";
import { validGameEnd } from "./game-end/valid-game-end";
import { validInputCommand } from "./input-command/valid-input-command";
import { validPilotSkillEffect } from "./pilot-skill/valid-pilot-skill-effect";
import { validReflect } from "./reflect/valid-reflect";
import { validRightItself } from "./right-itself/valid-right-itself";
import { validStartGame } from "./start-game/valid-start-game";
import { validTurnChange } from "./turn-change/valid-turn-change";
import { validUpdateRemainingTurn } from "./update-remaining-turn/valid-update-remaining-turn";

/** 有効なEffect */
const effects: Effect[] = [
  validStartGame,
  validGameEnd,
  validInputCommand,
  validReflect,
  validBatteryDeclaration,
  validBattle,
  validTurnChange,
  validBurstEffect,
  validUpdateRemainingTurn,
  validRightItself,
  validPilotSkillEffect,
];

test("Effectはパースできる", () => {
  effects.forEach((effect) => {
    expect(EffectSchema.parse(effect)).toEqual(effect);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  effects.forEach((effect) => {
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
