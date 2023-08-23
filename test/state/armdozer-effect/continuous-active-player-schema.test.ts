import {
  ContinuousActivePlayer,
  ContinuousActivePlayerSchema,
} from "../../../src";

/** 有効な ContinuousActivePlayer */
const continuousActivePlayer: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

test("ContinuousActivePlayerはパースできる", () => {
  expect(ContinuousActivePlayerSchema.parse(continuousActivePlayer)).toEqual(
    continuousActivePlayer,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(continuousActivePlayer);
  const data = JSON.parse(str);
  expect(ContinuousActivePlayerSchema.parse(data)).toEqual(
    continuousActivePlayer,
  );
});

test("ContinuousActivePlayer以外はパースできない", () => {
  const data = {
    type: "ContinuousActive",
    period: {
      type: "Special",
    },
  };
  expect(() => ContinuousActivePlayerSchema.parse(data)).toThrow();
});
