import {
  BattleResult,
  BattleResultSchema,
} from "../../../../src/effect/battle/result/battle-result";

/** 有効なBattleResult */
const battleResults: BattleResult[] = [
  {
    name: "NormalHit",
    damage: 2200,
  },
  {
    name: "Guard",
    damage: 1000,
  },
  {
    name: "CriticalHit",
    damage: 9999,
  },
  {
    name: "Miss",
  },
  {
    name: "Feint",
    isDefenderMoved: true,
  },
];

test("BattleResultはパースできる", () => {
  battleResults.forEach((battleResult) => {
    expect(BattleResultSchema.parse(battleResult)).toEqual(battleResult);
  });
});

test("文字からJSONパースしたオブジェクトでも、正しくパースできる", () => {
  battleResults.forEach((battleResult) => {
    const str = JSON.stringify(battleResult);
    const data = JSON.parse(str);
    expect(BattleResultSchema.parse(data)).toEqual(battleResult);
  });
});

test("BattleResult以外はパースできない", () => {
  const data = {
    type: "NormalHit",
    damaged: 2300,
  };
  expect(() => BattleResultSchema.parse(data)).toThrow();
});
