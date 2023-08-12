import { EmptyArmdozerEffect, parseEmptyArmdozerEffect } from "../../src";

/** 有効なEmptyArmdozerEffect */
const emptyArmdozerEffect: EmptyArmdozerEffect = {
  type: "Empty",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

test("EmptyArmdozerEffectはパースできる", () => {
  expect(parseEmptyArmdozerEffect(emptyArmdozerEffect)).toEqual(
    emptyArmdozerEffect,
  );
});

test("EmptyArmdozerEffect以外はパースできない", () => {
  const data = {
    type: "emptyArmdozerEffect",
    period: {
      type: "turnLimit",
      remaining: 1,
    },
  };
  expect(parseEmptyArmdozerEffect(data)).toBe(null);
});
