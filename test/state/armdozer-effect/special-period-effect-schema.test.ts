import {
  SpecialPeriodEffect,
  SpecialPeriodEffectSchema,
} from "../../../src/state/armdozer-effect/special-period-effect";

/** 有効なSpecialPeriodEffect */
const specialPeriodEffect: SpecialPeriodEffect = {
  type: "SpecialPeriod",
};

test("SpecialPeriodはパースできる", () => {
  expect(SpecialPeriodEffectSchema.parse(specialPeriodEffect)).toEqual(
    specialPeriodEffect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(specialPeriodEffect);
  const data = JSON.parse(str);
  expect(SpecialPeriodEffectSchema.parse(data)).toEqual(specialPeriodEffect);
});

test("SpecialPeriod以外はパースできない", () => {
  const data = { type: "specialPeriodEffect" };
  expect(() => SpecialPeriodEffectSchema.parse(data)).toThrow();
});
