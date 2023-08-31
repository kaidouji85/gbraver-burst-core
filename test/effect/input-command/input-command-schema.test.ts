import { InputCommandSchema } from "../../../src";
import { validInputCommand } from "./valid-input-command";

test("InputCommandはパースできる", () => {
  expect(InputCommandSchema.parse(validInputCommand)).toEqual(
    validInputCommand,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validInputCommand);
  const data = JSON.parse(str);
  expect(InputCommandSchema.parse(data)).toEqual(validInputCommand);
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
