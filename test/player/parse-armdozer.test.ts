import { Armdozer, EMPTY_ARMDOZER, parseArmdozer } from "../../src";

test("アームドーザはパースできる", () => {
  const data: Armdozer = EMPTY_ARMDOZER;
  expect(parseArmdozer(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Armdozer = EMPTY_ARMDOZER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(parseArmdozer(data)).toEqual(origin);
});

test("アームドーザ以外だとnullを返す", () => {
  const data = { maxHp: 3100, power: 2000, speed: 2000 };
  expect(parseArmdozer(data)).toBe(null);
});
