import {
  EffectPeriod,
  EffectPeriodSchema,
} from "../../../src";

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
    expect(EffectPeriodSchema.parse(effectPeriod)).toEqual(effectPeriod);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  effectPeriods.forEach((effectPeriod) => {
    const str = JSON.stringify(effectPeriod);
    const data = JSON.parse(str);
    expect(EffectPeriodSchema.parse(data)).toEqual(effectPeriod);
  });
});

test("EffectPeriod以外はパースできない", () => {
  const data = {
    type: "TurnLimit",
    remaining: 1,
  };
  expect(() => EffectPeriodSchema.parse(data)).toThrow();
});
