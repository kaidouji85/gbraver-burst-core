import { EMPTY_ARMDOZER, parseArmdozer } from "../../src";

test("アームドーザはパースできる", () => {
  const data = EMPTY_ARMDOZER;
  expect(parseArmdozer(data)).toEqual(data);
});

test("アームドーザ以外だとnullを返す", () => {
  const data = { maxHp: 3100, power: 2000, speed: 2000};
  expect(parseArmdozer(data)).toBe(null);
});
