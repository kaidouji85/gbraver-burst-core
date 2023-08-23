import { EvenMatch, EvenMatchSchema } from "../../../src";

/** 有効なEvenMatch */
const evenMatch: EvenMatch = {
  type: "EvenMatch",
};

test("EvenMatchはパースできる", () => {
  expect(EvenMatchSchema.parse(evenMatch)).toEqual(evenMatch);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(evenMatch);
  const data = JSON.parse(str);
  expect(EvenMatchSchema.parse(data)).toEqual(evenMatch);
});

test("EvenMatch以外はパースできない", () => {
  const data = {
    name: "EvenMatch",
  };
  expect(() => EvenMatchSchema.parse(data)).toThrow();
});
