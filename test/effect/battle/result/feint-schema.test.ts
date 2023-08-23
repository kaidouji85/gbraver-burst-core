import { Feint, FeintSchema } from "../../../../src";

/** 有効なFeint */
const feint: Feint = {
  name: "Feint",
  isDefenderMoved: true,
};

test("Feintはパースできる", () => {
  expect(FeintSchema.parse(feint)).toEqual(feint);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(feint);
  const data = JSON.parse(str);
  expect(FeintSchema.parse(data)).toEqual(feint);
});

test("Feint以外はパースできない", () => {
  const data = {
    type: "Feint",
    isDefenderMovedFlag: true,
  };
  expect(() => FeintSchema.parse(data)).toThrow();
});
