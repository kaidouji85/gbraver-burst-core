import {parseSpecialPeriodEffect, SpecialPeriodEffect} from "../../src/state/armdozer-effect";

const specialPeriodEffect: SpecialPeriodEffect = {
  type: "SpecialPeriod",
};

test("SpecialPeriodはパースできる", () => {
  expect(parseSpecialPeriodEffect(specialPeriodEffect)).toEqual(specialPeriodEffect);
});

test("SpecialPeriod以外はパースできない", () => {
  const data = { type: "specialPeriodEffect" };
  expect(parseSpecialPeriodEffect(data)).toEqual(null);
});