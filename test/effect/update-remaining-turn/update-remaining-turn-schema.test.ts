import { UpdateRemainingTurnSchema } from "../../../src/effect/update-remaining-turn/update-remaining-turn";
import { validUpdateRemainingTurn } from "./valid-update-remaining-turn";

test("UpdateRemainingTurnはパースできる", () => {
  expect(UpdateRemainingTurnSchema.parse(validUpdateRemainingTurn)).toEqual(
    validUpdateRemainingTurn,
  );
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validUpdateRemainingTurn);
  const data = JSON.parse(str);
  expect(UpdateRemainingTurnSchema.parse(data)).toEqual(
    validUpdateRemainingTurn,
  );
});

test("UpdateRemainingTurn以外はパースできない", () => {
  const data = {
    type: "UpdateRemainingTurn",
  };
  expect(() => UpdateRemainingTurnSchema.parse(data)).toThrow();
});
