import { ContinuousActivePlayer, parseContinuousActivePlayer } from "../../src";

/** 有効な ContinuousActivePlayer */
const continuousActivePlayer: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

test("ContinuousActivePlayerはパースできる", () => {
  expect(parseContinuousActivePlayer(continuousActivePlayer)).toEqual(
    continuousActivePlayer,
  );
});

test("ContinuousActivePlayer以外はパースできない", () => {
  const data = {
    type: "ContinuousActive",
    period: {
      type: "Special",
    },
  };
  expect(parseContinuousActivePlayer(data)).toBeNull();
});
