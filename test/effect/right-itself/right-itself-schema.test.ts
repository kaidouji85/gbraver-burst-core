import { RightItselfSchema } from "../../../src";
import { validRightItself } from "./valid-right-itself";

test("RightItselfはパースできる", () => {
  expect(RightItselfSchema.parse(validRightItself)).toEqual(validRightItself);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validRightItself);
  const data = JSON.parse(str);
  expect(RightItselfSchema.parse(data)).toEqual(validRightItself);
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
