import { ReflectDamageEffect, ReflectDamageEffectSchema } from "../../../src";

/** 有効なReflectDamageEffect */
const reflectDamageEffect: ReflectDamageEffect = "Lightning";

test("ReflectDamageEffectSchemaでパースできる", () => {
  expect(ReflectDamageEffectSchema.parse(reflectDamageEffect)).toEqual(
    reflectDamageEffect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(reflectDamageEffect);
  const data = JSON.parse(str);
  expect(ReflectDamageEffectSchema.parse(data)).toEqual(reflectDamageEffect);
});

test("ReflectDamageEffectSchemaでパースできない", () => {
  const data = "Fire";
  expect(() => ReflectDamageEffectSchema.parse(data)).toThrow();
});
