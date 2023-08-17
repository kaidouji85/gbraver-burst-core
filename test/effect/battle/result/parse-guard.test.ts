import { Guard, parseGuard } from "../../../../src";

/** 有効なGuard */
const guard: Guard = {
  name: "Guard",
  damage: 1000,
};

test("Guardはパースできる", () => {
  expect(parseGuard(guard)).toEqual(guard);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(guard);
  const data = JSON.parse(str);
  expect(parseGuard(data)).toEqual(data);
});

test("Guard以外はパースできない", () => {
  const data = {
    type: "Guard",
    damaged: 1000,
  };
  expect(parseGuard(data)).toBeNull();
});