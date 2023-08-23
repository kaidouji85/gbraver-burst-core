import { NormalHit, NormalHitSchema } from "../../../../src";

/** 有効なNormalHit */
const normalHit: NormalHit = {
  name: "NormalHit",
  damage: 2200,
};

test("NormalHitはパースできる", () => {
  expect(NormalHitSchema.parse(normalHit)).toEqual(normalHit);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(normalHit);
  const data = JSON.parse(str);
  expect(NormalHitSchema.parse(data)).toEqual(normalHit);
});

test("NormalHit以外はパースできない", () => {
  const data = {
    type: "NormalHit",
    damaged: 2300,
  };
  expect(() => NormalHitSchema.parse(data)).toThrow();
});
