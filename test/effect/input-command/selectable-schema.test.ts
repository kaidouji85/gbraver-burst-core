import {
  Selectable,
  SelectableSchema,
} from "../../../src/effect/input-command/input-command";

/** 有効なSelectable */
const selectable: Selectable = {
  playerId: "player1",
  selectable: true,
  command: [
    {
      type: "BATTERY_COMMAND",
      battery: 0,
    },
    {
      type: "BATTERY_COMMAND",
      battery: 1,
    },
  ],
};

test("Selectableはパースできる", () => {
  expect(SelectableSchema.parse(selectable)).toEqual(selectable);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(selectable);
  const data = JSON.parse(str);
  expect(SelectableSchema.parse(data)).toEqual(selectable);
});

test("Selectable以外はパースできない", () => {
  const data = {
    player: "player1",
    selectable: "true",
    command: [
      {
        type: "BATTERY",
        battery: 0,
      },
      {
        type: "BATTERY",
        battery: 1,
      },
    ],
  };
  expect(() => SelectableSchema.parse(data)).toThrow();
});
