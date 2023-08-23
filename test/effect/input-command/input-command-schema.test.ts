import { InputCommand, InputCommandSchema } from "../../../src";

/** 有効なInputCommand */
const inputCommand: InputCommand = {
  name: "InputCommand",
  players: [
    {
      playerId: "player1",
      selectable: false,
      nextTurnCommand: {
        type: "BATTERY_COMMAND",
        battery: 3,
      },
    },
    {
      playerId: "player2",
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
    },
  ],
};

test("InputCommandはパースできる", () => {
  expect(InputCommandSchema.parse(inputCommand)).toEqual(inputCommand);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(inputCommand);
  const data = JSON.parse(str);
  expect(InputCommandSchema.parse(data)).toEqual(inputCommand);
});

test("InputCommand以外はパースできない", () => {
  const data = {
    type: "InputCommand",
    players: [
      {
        playerId: "player1",
        selectable: "true",
        nextTurnCommand: {
          type: "BATTERY",
          battery: 3,
        },
      },
      {
        playerId: "player2",
        selectable: "false",
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
      },
    ],
  };
  expect(() => InputCommandSchema.parse(data)).toThrow();
});
