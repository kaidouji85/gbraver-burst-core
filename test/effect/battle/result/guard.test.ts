import { ArmdozerEffect } from "../../../../src";
import { guard } from "../../../../src/effect/battle/result/guard";
import {
  EMPTY_CORRECT_POWER,
  EMPTY_DAMAGE_HALVED,
} from "../../../../src/empty/amrdozer-effect";
import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import type { PlayerState } from "../../../../src/state/player-state/player-state";

/** 攻撃側のパラメータ */
type AttackerParams = {
  /** 攻撃力 */
  power: number;
  /** 効果 */
  effects?: ArmdozerEffect[];
};

/**
 * 攻撃側プレイヤーを生成する
 * @param params パラメータ
 * @return 生成結果
 */
const createAttacker = (params: AttackerParams): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: { ...EMPTY_ARMDOZER_STATE, ...params },
});

/** 防御側のパラメータ */
type DefenderParams = {
  effects?: ArmdozerEffect[];
};

/**
 * 防御側プレイヤーを生成する
 * @param params パラメータ
 * @return 生成結果
 */
const createDefender = (params: DefenderParams): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: { ...EMPTY_ARMDOZER_STATE, ...params },
});

/** 効果 攻撃アップ */
const correctPower = { ...EMPTY_CORRECT_POWER, power: 1000 };

/** 効果 ダメージ半減 */
const damageHalved = EMPTY_DAMAGE_HALVED;

test("ガードは通常ヒット半分のダメージを受ける", () => {
  const attacker = createAttacker({ power: 2000 });
  const defender = createDefender({});
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 1000,
  });
});

test("攻撃補正が正しく適用される", () => {
  const attacker = createAttacker({ power: 2000, effects: [correctPower] });
  const defender = createDefender({});
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 1500,
  });
});

test("ダメージ半減が正しく適用される", () => {
  const attacker = createAttacker({ power: 2000 });
  const defender = createDefender({ effects: [damageHalved] });
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 500,
  });
});

test("攻撃補正 -> ダメージ半減 -> ガードによるダメージ半減、の順番で計算される", () => {
  const attacker = createAttacker({ power: 2000, effects: [correctPower] });
  const defender = createDefender({ effects: [damageHalved] });
  expect(guard(attacker, 3, defender, 3)).toEqual({
    name: "Guard",
    damage: 750,
  });
});
