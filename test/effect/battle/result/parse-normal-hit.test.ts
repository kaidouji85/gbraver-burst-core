import { NormalHit, parseNormalHit } from "../../../../src";

/** 有効なNormalHit */
const normalHit: NormalHit = {
  name: "NormalHit",
  damage: 2200,
};

test("NormalHitはパースできる", () => {
  expect(parseNormalHit(normalHit)).toEqual(normalHit);
});

test("NormalHit -> JSON.stringify -> JSON.parse、でもパースできる", () => {
  const json = JSON.stringify(normalHit);
  const data = JSON.parse(json);
  expect(parseNormalHit(data)).toEqual(data);
});

test("NormalHit以外はパースできない", () => {
  const data = {
    type: "NormalHit",
    damaged: 2300,
  };
  expect(parseNormalHit(data)).toBeNull();
});