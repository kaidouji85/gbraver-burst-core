import {
  ArmdozerEffect,
  ArmdozerEffectsDisabled,
  CorrectPower,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "../../../../src";
import { hasArmdozerEffectsDisabled } from "../../../../src/game/progress/battle-flow/has-armdozer-effects-disabled";

/**
 * テストプレイヤーを生成する
 * @param effects テストプレイヤーのアームドーザ効果
 * @returns テストプレイヤー
 */
const createPlayer = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "test-player",
  armdozer: { ...EMPTY_ARMDOZER_STATE, effects },
});

/** アームドーザ効果無効 */
const armdozerEffectDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 1 },
};

/**攻撃補正 */
const correctPower: CorrectPower = {
  type: "CorrectPower",
  power: 1000,
  period: { type: "TurnLimit", remainingTurn: 1 },
};

test("アームドーザ効果無効をもつ場合はtrueを返す", () => {
  const player = createPlayer([armdozerEffectDisabled, correctPower]);
  expect(hasArmdozerEffectsDisabled(player)).toBe(true);
});

test("アームドーザ効果無効がない場合はfalseを返す", () => {
  const player = createPlayer([correctPower]);
  expect(hasArmdozerEffectsDisabled(player)).toBe(false);
});

test("何も効果を得ていない場合はfalseを返す", () => {
  const player = createPlayer([]);
  expect(hasArmdozerEffectsDisabled(player)).toBe(false);
});
