import { TurnChange, TurnChangeSchema } from "../../../src";

/** 有効なTurnChange */
const turnChange: TurnChange = {
  name: "TurnChange",
  recoverBattery: 3,
};

test("TurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(turnChange)).toEqual(turnChange);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(turnChange);
  const data = JSON.parse(str);
  expect(TurnChangeSchema.parse(data)).toEqual(turnChange);
});

test("TurnChange以外はパースできない", () => {
  const data = {
    type: "TurnChange",
    recover: 3,
  };
  expect(() => TurnChangeSchema.parse(data)).toThrow();
});
