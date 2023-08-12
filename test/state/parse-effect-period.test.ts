import {EffectPeriod, parseEffectPeriod} from "../../src/state/armdozer-effect/effect-period";

/** 有効なEffectPeriod */
const effectPeriods: EffectPeriod[] = [
  {
    type: "TurnLimit",
    remainingTurn: 1,
  },
  {
    type: "SpecialPeriod",
  },
];

test("EffectPeriodはパースできる", () => {
  effectPeriods.forEach((effectPeriod) => {
    expect(parseEffectPeriod(effectPeriod)).toEqual(effectPeriod);
  });
});

test("EffectPeriod以外はパースできない", () => {
  const data = {
    type: "TurnLimit",
    remaining: 1,
  };
  expect(parseEffectPeriod(data)).toBe(null);
});
