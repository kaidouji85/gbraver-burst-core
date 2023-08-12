import {parseTurnLimitEffect, TurnLimitEffect} from "../../src/state/armdozer-effect";

/** 有効なTurnLimitEffect */
const turnLimit: TurnLimitEffect = {
  type: "TurnLimit",
  remainingTurn: 1,
}

test("TurnLimitはパースできる", () => {
  expect(parseTurnLimitEffect(turnLimit)).toEqual(turnLimit);
});

test("TurnLimit以外はパースできない", () => {
  const data = { type: "turnLimit", turn: 1};
  expect(parseTurnLimitEffect(data)).toEqual(null);
});
