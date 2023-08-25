import { Reflect, ReflectSchema } from "../../../src";

/** 有効なReflect */
const reflect: Reflect = {
  name: "Reflect",
  damagedPlayer: "player1",
  isDeath: false,
  damage: 2000,
  effect: "Lightning",
};

test("Reflectはパースできる", () => {
  expect(ReflectSchema.parse(reflect)).toEqual(reflect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(reflect);
  const data = JSON.parse(str);
  expect(ReflectSchema.parse(data)).toEqual(reflect);
});

test("Reflect以外はパースできない", () => {
  const data = {
    name: "Reflect",
    damagedPlayer: "player1",
    damage: "1000",
    effect: "Lightning",
  };
  expect(() => ReflectSchema.parse(data)).toThrow();
});
