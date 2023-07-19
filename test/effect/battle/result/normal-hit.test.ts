import { ArmdozerEffect } from "../../../../src";
import { normalHit } from "../../../../src/effect/battle/result/normal-hit";
import {
  EMPTY_CORRECT_POWER,
  EMPTY_DAMAGE_HALVED,
} from "../../../../src/empty/amrdozer-effect";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerState } from "../../../../src/state/player-state";

type AttackerParams = {
  power: number,
  effects?: ArmdozerEffect[],
}

const createAttacker = ({power, effects}: AttackerParams): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: { ...EMPTY_ARMDOZER_STATE, power, effects: effects ?? [] },
});

type DefenderParams = {
  effects?: ArmdozerEffect[];
};

const createDefender = ({effects}: DefenderParams): PlayerState => ({
  ...EMPTY_PLAYER_STATE, 
  playerId: "player2",
  armdozer: { ...EMPTY_ARMDOZER_STATE, effects: effects ?? [] }
});

const correctPower = {
  ...EMPTY_CORRECT_POWER,
  power: 1000
};

const damageHalved = EMPTY_DAMAGE_HALVED;

test("通常ヒットのダメージ計算が正しい", () => {
  const attacker = createAttacker({power: 2000});
  const defender = createDefender({});
  expect(normalHit(attacker, 5, defender, 2)).toEqual({
    name: "NormalHit",
    damage: 2200,
  });
});

test("攻撃補正が正しく適用される", () => {
  const attacker = createAttacker({power: 2000, effects: [correctPower]});
  const defender = createDefender({});
  expect(normalHit(attacker, 5, defender, 2)).toEqual({
    name: "NormalHit",
    damage: 3200,
  });
});

test("ダメージ半減が正しく適用される", () => {
  const attacker = createAttacker({power: 2000});
  const defender = createDefender({effects: [damageHalved]});
  expect(normalHit(attacker, 5, defender, 2)).toEqual({
    name: "NormalHit",
    damage: 1100,
  });
});

test("攻撃補正 -> ダメージ半減の順番で計算する", () => {
  const attacker = createAttacker({power: 2000, effects: [correctPower]});
  const defender = createDefender({effects: [damageHalved]});
  expect(normalHit(attacker, 5, defender, 2)).toEqual({
    name: "NormalHit",
    damage: 1600,
  });
});
