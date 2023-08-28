import { InputCommand } from "../../../src";

/** 有効なInputCommand */
export const validInputCommand: InputCommand = {
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