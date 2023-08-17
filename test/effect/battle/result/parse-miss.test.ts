import { Miss, parseMiss } from "../../../../src";

/** 有効なMiss */
const miss: Miss = {
  name: "Miss",
};

test("Missはパースできる", () => {
  expect(parseMiss(miss)).toEqual(miss);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(miss);
  const data = JSON.parse(str);
  expect(parseMiss(data)).toEqual(data);
});

test("Miss以外はパースできない", () => {
  const data = {
    type: "Miss",
  };
  expect(parseMiss(data)).toBeNull();
});