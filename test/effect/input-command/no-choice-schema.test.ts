import { NoChoice, NoChoiceSchema } from "../../../src";

/** 有効なNoChoice */
const noChoice: NoChoice = {
  playerId: "player1",
  selectable: false,
  nextTurnCommand: {
    type: "BATTERY_COMMAND",
    battery: 3,
  },
};

test("NoChoiceはパースできる", () => {
  expect(NoChoiceSchema.parse(noChoice)).toEqual(noChoice);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(noChoice);
  const data = JSON.parse(str);
  expect(NoChoiceSchema.parse(data)).toEqual(noChoice);
});

test("NoChoice以外はパースできない", () => {
  const data = {
    playerId: "player1",
    selectable: "true",
    nextCommand: {
      type: "BATTERY",
      battery: 3,
    },
  };
  expect(() => NoChoiceSchema.parse(data)).toThrow();
});