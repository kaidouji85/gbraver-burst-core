import { Guard, GuardSchema } from "../../../../src";

/** 有効なGuard */
const guard: Guard = {
  name: "Guard",
  damage: 1000,
};

test("Guardはパースできる", () => {
  expect(GuardSchema.parse(guard)).toEqual(guard);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(guard);
  const data = JSON.parse(str);
  expect(GuardSchema.parse(data)).toEqual(guard);
});

test("Guard以外はパースできない", () => {
  const data = {
    type: "Guard",
    damaged: 1000,
  };
  expect(() => GuardSchema.parse(data)).toThrow();
});
