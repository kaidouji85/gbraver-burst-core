import { Armdozer, ArmdozerSchema, EMPTY_ARMDOZER } from "../../src";

test("アームドーザはパースできる", () => {
  const data: Armdozer = EMPTY_ARMDOZER;
  expect(ArmdozerSchema.parse(data)).toEqual(data);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const origin: Armdozer = EMPTY_ARMDOZER;
  const str = JSON.stringify(origin);
  const data = JSON.parse(str);
  expect(ArmdozerSchema.parse(data)).toEqual(origin);
});

test("アームドーザ以外だとnullを返す", () => {
  const data = { maxHp: 3100, power: 2000, speed: 2000 };
  expect(() => ArmdozerSchema.parse(data)).toThrow();
});
