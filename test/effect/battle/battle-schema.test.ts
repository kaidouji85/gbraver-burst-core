import { Battle, BattleSchema } from "../../../src";

/** 有効なBattle */
const battle: Battle = {
  name: "Battle",
  attacker: "p1",
  isDeath: false,
  result: {
    name: "NormalHit",
    damage: 1000,
  },
};

test("Battleはパースできる", () => {
  expect(BattleSchema.parse(battle)).toEqual(battle);
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  const str = JSON.stringify(battle);
  const data = JSON.parse(str);
  expect(BattleSchema.parse(data)).toEqual(battle);
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
