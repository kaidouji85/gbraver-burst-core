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

test("ReflectDamageEffectSchemaでパースできない", () => {
  const data = "Fire";
  expect(parseReflectDamageEffect(data)).toBe(null);
});
