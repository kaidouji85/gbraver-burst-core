import { Miss, MissSchema } from "../../../../src";

/** 有効なMiss */
const miss: Miss = {
  name: "Miss",
};

test("Missはパースできる", () => {
  expect(MissSchema.parse(miss)).toEqual(miss);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(miss);
  const data = JSON.parse(str);
  expect(MissSchema.parse(data)).toEqual(miss);
});

test("Miss以外はパースできない", () => {
  const data = {
    type: "Miss",
  };
  expect(() => MissSchema.parse(data)).toThrow();
});
