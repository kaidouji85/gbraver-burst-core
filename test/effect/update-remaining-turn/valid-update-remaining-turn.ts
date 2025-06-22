import { UpdateRemainingTurn } from "../../../src/effect/update-remaining-turn/update-remaining-turn";

/** 有効なUpdateRemainingTurn */
export const validUpdateRemainingTurn: UpdateRemainingTurn = {
  name: "UpdateRemainingTurn",
  endArmdozerEffects: [
    {
      playerId: "player1",
      effect: {
        type: "CorrectPower",
        power: 1000,
        period: {
          type: "TurnLimit",
          remainingTurn: 2,
        },
      },
    },
  ],
};
