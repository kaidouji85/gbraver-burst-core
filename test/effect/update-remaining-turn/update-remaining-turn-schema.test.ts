import { UpdateRemainingTurn, UpdateRemainingTurnSchema } from "../../../src";

/** 有効なUpdateRemainingTurn */
const updateRemainingTurn: UpdateRemainingTurn = {
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
      }
    }
  ]
};

test("UpdateRemainingTurnはパースできる", () => {
  expect(UpdateRemainingTurnSchema.parse(updateRemainingTurn)).toEqual(updateRemainingTurn);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(updateRemainingTurn);
  const data = JSON.parse(str);
  expect(UpdateRemainingTurnSchema.parse(data)).toEqual(updateRemainingTurn);
});

test("UpdateRemainingTurn以外はパースできない", () => {
  const data = {
    type: "UpdateRemainingTurn",
  };
  expect(() => UpdateRemainingTurnSchema.parse(data)).toThrow();
});
