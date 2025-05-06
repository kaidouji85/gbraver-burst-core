import { EffectClear, EffectClearSchema } from "../../../src";

/** EffectClear */
const effectClear: EffectClear = {
  type: "EffectClear",
  recoverBattery: 2,
};

test("EffectClearパースできる", () => {
  expect(EffectClearSchema.parse(effectClear)).toEqual(effectClear);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(effectClear);
  const data = JSON.parse(str);
  expect(EffectClearSchema.parse(data)).toEqual(effectClear);
});

test("EffectClear 以外は例外を投げる", () => {
  const data = {
    type: "EffectClear",
    recover: 3,
  };
  expect(() => EffectClearSchema.parse(data)).toThrow();
});
