import { ReflectSchema } from "../../../src/effect/reflect/reflect";
import { validReflect } from "./valid-reflect";

test("Reflectはパースできる", () => {
  expect(ReflectSchema.parse(validReflect)).toEqual(validReflect);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validReflect);
  const data = JSON.parse(str);
  expect(ReflectSchema.parse(data)).toEqual(validReflect);
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
