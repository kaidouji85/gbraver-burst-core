import { TurnChangeSchema } from "../../../src";
import { validTurnChange } from "./valid-turn-change";

test("TurnChangeはパースできる", () => {
  expect(TurnChangeSchema.parse(validTurnChange)).toEqual(validTurnChange);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validTurnChange);
  const data = JSON.parse(str);
  expect(TurnChangeSchema.parse(data)).toEqual(validTurnChange);
});

test("TurnChange以外はパースできない", () => {
  const data = {
    type: "TurnChange",
    recover: 3,
  };
  expect(() => TurnChangeSchema.parse(data)).toThrow();
});
