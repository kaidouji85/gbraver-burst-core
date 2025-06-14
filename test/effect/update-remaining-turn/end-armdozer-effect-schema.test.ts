import {
  EndArmdozerEffect,
  EndArmdozerEffectSchema,
} from "../../../src/effect/update-remaining-turn/update-remaining-turn";

/** 有効なEndArmdozerEffect */
const endArmdozerEffect: EndArmdozerEffect = {
  playerId: "player1",
  effect: {
    type: "CorrectPower",
    power: 1000,
    period: {
      type: "TurnLimit",
      remainingTurn: 2,
    },
  },
};

test("EndArmdozerEffectはパースできる", () => {
  expect(EndArmdozerEffectSchema.parse(endArmdozerEffect)).toEqual(
    endArmdozerEffect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(endArmdozerEffect);
  const data = JSON.parse(str);
  expect(EndArmdozerEffectSchema.parse(data)).toEqual(endArmdozerEffect);
});

test("EndArmdozerEffect以外はパースできない", () => {
  const data = {
    type: "EndArmdozerEffect",
  };
  expect(() => EndArmdozerEffectSchema.parse(data)).toThrow();
});
