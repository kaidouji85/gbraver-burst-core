import {
  parseReflectDamageEffect,
  ReflectDamageEffect,
} from "../../../src/state/armdozer-effect/reflect-damage-effect";

/** 有効なReflectDamageEffect */
const reflectDamageEffect: ReflectDamageEffect = "Lightning";

test("ReflectDamageEffectSchemaでパースできる", () => {
  expect(parseReflectDamageEffect(reflectDamageEffect)).toEqual(
    reflectDamageEffect,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(reflectDamageEffect);
  const data = JSON.parse(str);
  expect(parseReflectDamageEffect(data)).toEqual(reflectDamageEffect);
});

test("ReflectDamageEffectSchemaでパースできない", () => {
  const data = "Fire";
  expect(parseReflectDamageEffect(data)).toBe(null);
});
