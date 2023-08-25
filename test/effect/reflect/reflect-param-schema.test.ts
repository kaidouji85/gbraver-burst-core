import { ReflectParam, ReflectParamSchema } from "../../../src/effect/reflect/reflect";

/** 有効なReflectParam */
const reflectParam: ReflectParam = {
  damage: 1000,
  effect: "Lightning",
};

test("ReflectParamはパースできる", () => {
  expect( ReflectParamSchema.parse(reflectParam)).toEqual(reflectParam);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(reflectParam);
  const data = JSON.parse(str);
  expect(ReflectParamSchema.parse(data)).toEqual(reflectParam);
});

test("ReflectParam以外はパースできない", () => {
  const data = {
    damage: "1000",
    effectType: "Lightning",
  };
  expect(() => ReflectParamSchema.parse(data)).toThrow();
});