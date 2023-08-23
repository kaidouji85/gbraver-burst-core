import {
  TurnLimitEffect,
  TurnLimitEffectSchema,
} from "../../../src";

/** 有効なTurnLimitEffect */
const turnLimit: TurnLimitEffect = {
  type: "TurnLimit",
  remainingTurn: 1,
};

test("TurnLimitはパースできる", () => {
  expect(TurnLimitEffectSchema.parse(turnLimit)).toEqual(turnLimit);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(turnLimit);
  const data = JSON.parse(str);
  expect(TurnLimitEffectSchema.parse(data)).toEqual(turnLimit);
});

test("TurnLimit以外はパースできない", () => {
  const data = { type: "turnLimit", turn: 1 };
  expect(() => TurnLimitEffectSchema.parse(data)).toThrow();
});
