import { BattleSchema } from "../../../src/effect/battle/battle";
import { validBattle } from "./valid-battle";

test("Battleはパースできる", () => {
  expect(BattleSchema.parse(validBattle)).toEqual(validBattle);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(validBattle);
  const data = JSON.parse(str);
  expect(BattleSchema.parse(data)).toEqual(validBattle);
});

test("Battle以外はパースできない", () => {
  const data = {
    type: "Battle",
    attacker: "p1",
    isDeath: false,
    result: {
      type: "NormalHit",
      damaged: 1000,
    },
  };
  expect(() => BattleSchema.parse(data)).toThrow();
});
