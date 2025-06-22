import { Battle } from "../../../src/effect/battle/battle";

/** 有効なBattle */
export const validBattle: Battle = {
  name: "Battle",
  attacker: "p1",
  isDeath: false,
  result: {
    name: "NormalHit",
    damage: 1000,
  },
};
