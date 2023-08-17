import { Feint, parseFeint } from "../../../../src";

/** 有効なFeint */
const feint: Feint = {
  name: "Feint",
  isDefenderMoved: true,
};

test("Feintはパースできる", () => {
  expect(parseFeint(feint)).toEqual(feint);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(feint);
  const data = JSON.parse(str);
  expect(parseFeint(data)).toEqual(data);
});

test("Feint以外はパースできない", () => {
  const data = {
    type: "Feint",
    isDefenderMovedFlag: true,
  };
  expect(parseFeint(data)).toBeNull();
});