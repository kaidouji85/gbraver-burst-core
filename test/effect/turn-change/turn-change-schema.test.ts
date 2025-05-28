import { TurnChange, TurnChangeSchema } from "../../../src/effect/turn-change/turn-change";

// reason: "TurnEnd" のTurnChange
const turnEnd: TurnChange = {
  name: "TurnChange",
  recoverBattery: 3,
  reason: "TurnEnd",
};
// reason: "ContinuousActive" のTurnChange
const continuousActive: TurnChange = {
  name: "TurnChange",
  recoverBattery: 0,
  reason: "ContinuousActive",
};

test("reason: 'TurnEnd' のTurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(turnEnd)).toEqual(turnEnd);
});

test("reason: 'ContinuousActive' のTurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(continuousActive)).toEqual(continuousActive);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(turnEnd);
  const data = JSON.parse(str);
  expect(TurnChangeSchema.parse(data)).toEqual(turnEnd);
});

test("TurnChange以外はパースできない", () => {
  const data = {
    type: "TurnChange",
    recover: 3,
  };
  expect(() => TurnChangeSchema.parse(data)).toThrow();
});
