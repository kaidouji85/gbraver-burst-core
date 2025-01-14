import {
  ArmdozerEffect,
  ArmdozerEffectsDisabled,
  Battle,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "../../../../src";
import { canReflectFlow } from "../../../../src/game/progress/battle-flow/can-reflect-flow";

/** 防御側プレイヤー */
const attacker: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };

/**
 * 防御側プレイヤーを生成する
 * @param effects 適用されている効果
 */
const createDefender = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: { ...EMPTY_ARMDOZER_STATE, effects },
});


/** 攻撃ヒットの戦闘結果 */
const attackHit: Battle = {
  name: "Battle",
  attacker: attacker.playerId,
  isDeath: false,
  result: { name: "NormalHit", damage: 2000 },
};

/** 攻撃ヒットでない戦闘結果 */
const notAttackHit: Battle = {
  name: "Battle",
  attacker: attacker.playerId,
  isDeath: false,
  result: { name: "Miss" },
};

/** 効果無視 */
const armdozerEffectDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 2 },
};

test("攻撃ヒットかつ防御側に効果無視が適用されていない場合、ダメージ反射フローを実行する", () => {
  const defender = createDefender([]);
  expect(
    canReflectFlow({ effect: attackHit, players: [defender, attacker] }),
  ).toBe(true);
});

test("攻撃ヒットかつ防御側に効果無視が適用されている場合、ダメージ反射フローを実行しない", () => {
  const defender = createDefender([armdozerEffectDisabled]);
  expect(
    canReflectFlow({ effect: attackHit, players: [defender, attacker] }),
  ).toBe(false);
});

test("攻撃ヒットでないかつ防御側に効果無視が適用されていない場合、ダメージ反射フローを実行しない", () => {
  const defender = createDefender([]);
  expect(
    canReflectFlow({ effect: notAttackHit, players: [defender, attacker] }),
  ).toBe(false);
});

test("攻撃ヒットでないかつ防御側に効果無視が適用されている場合、ダメージ反射フローを実行しない", () => {
  const defender = createDefender([armdozerEffectDisabled]);
  expect(
    canReflectFlow({ effect: notAttackHit, players: [defender, attacker] }),
  ).toBe(false);
});

test("防御側プレイヤーが存在しない場合、例外を投げる", () => {
  expect(() =>
    // 本関数はeffect.attackerとプレイヤーIDが一致しないものを防御側とみなしている
    // 防御側が存在しない状況を再現するために、攻撃側プレイヤーを2人配置している
    canReflectFlow({ effect: notAttackHit, players: [attacker, attacker] }),
  ).toThrow();
});
