import { NormalHit, parseNormalHit } from "../../../../src";

/** 有効なNormalHit */
const normalHit: NormalHit = {
  name: "NormalHit",
  damage: 2200,
};

test("NormalHitはパースできる", () => {
  expect(parseNormalHit(normalHit)).toEqual(normalHit);
});

test("NormalHit以外はパースできない", () => {
  const data = {
    type: "NormalHit",
    damaged: 2300,
  };
  expect(parseNormalHit(data)).toBeNull();
});