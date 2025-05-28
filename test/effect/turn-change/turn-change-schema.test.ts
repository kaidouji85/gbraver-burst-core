import {
  TurnChange,
  TurnChangeSchema,
} from "../../../src/effect/turn-change/turn-change";

/** reason: "Normal" のTurnChange */
const normal: TurnChange = {
  name: "TurnChange",
  recoverBattery: 3,
  reason: "Normal",
};

/** reason: "ContinuousActive" のTurnChange */
const continuousActive: TurnChange = {
  name: "TurnChange",
  recoverBattery: 0,
  reason: "ContinuousActive",
};

test("reason: 'Normal' のTurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(normal)).toEqual(normal);
});

test("reason: 'ContinuousActive' のTurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(continuousActive)).toEqual(continuousActive);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(normal);
  const data = JSON.parse(str);
  expect(TurnChangeSchema.parse(data)).toEqual(normal);
});

test("reasonが不正な値の場合はパースできず例外を投げる", () => {
  const invalidReason = {
    name: "TurnChange",
    recoverBattery: 3,
    reason: "invalid",
  };
  expect(() => TurnChangeSchema.parse(invalidReason)).toThrow();
});

test("TurnChange以外はパースできない", () => {
  const data = {
    type: "TurnChange",
    recover: 3,
  };
  expect(() => TurnChangeSchema.parse(data)).toThrow();
});