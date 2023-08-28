import { RightItself, RightItselfSchema } from "../../../src";

/** 有効なRightItself */
const rightItself: RightItself = {
  name: "RightItself",
  defender: "p1",
  battleResult: {
    name: "NormalHit",
    damage: 2000,
  },
};

test("RightItselfはパースできる", () => {
  expect(RightItselfSchema.parse(rightItself)).toEqual(rightItself);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(rightItself);
  const data = JSON.parse(str);
  expect(RightItselfSchema.parse(data)).toEqual(rightItself);
});

test("RightItself以外はパースできない", () => {
  const data = {
    name: "RightItself",
    defender: "p1",
    result: {
      name: "NormalHit",
      damage: 1000,
    },
  };
  expect(() => RightItselfSchema.parse(data)).toThrow();
});
