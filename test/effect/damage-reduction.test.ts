import {
  ArmdozerEffect,
  DamageHalved,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "../../src";
import { damageReduction } from "../../src/effect/damage-reduction";

/** ダメージ半減効果 */
const damageHalved: DamageHalved = {
  type: "DamageHalved",
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

/**
 * テスト用プレイヤーを生成する
 * @param effects アームドーザ効果
 * @returns 生成結果
 */
const createPlayer = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "test-player",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    effects,
  },
});

test("アームドーザ効果がない場合、ダメージ減少率は1である", () => {
  const defender = createPlayer([]);
  expect(damageReduction(defender)).toBe(1);
});

test("ダメージ半減効果を持つ場合、減少率は0.5である", () => {
  const defender = createPlayer([damageHalved]);
  expect(damageReduction(defender)).toBe(0.5);
});
