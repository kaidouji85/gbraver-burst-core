import {
  ArmdozerEffect,
  ArmdozerEffectsDisabled,
  Battle,
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "../../../../src";
import { canReflectFlow } from "../../../../src/game/progress/battle-flow/can-reflect-flow";

/** 攻撃側プレイヤーのID */
const attackerPlayerId = "attacker";

/**
 * 攻撃側プレイヤーを生成する
 * @param effects 適用されている効果
 */
const createAttacker = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: attackerPlayerId,
  armdozer: { ...EMPTY_ARMDOZER_STATE, effects },
});

/** 防御側プレイヤー */
const defender: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "defender" };

/** 攻撃ヒットの戦闘結果 */
const attackHit: Battle = {
  name: "Battle",
  attacker: attackerPlayerId,
  isDeath: false,
  result: { name: "NormalHit", damage: 2000 },
};

/** 攻撃ヒットでない戦闘結果 */
const notAttackHit: Battle = {
  name: "Battle",
  attacker: attackerPlayerId,
  isDeath: false,
  result: { name: "Miss" },
};

/** 効果無視 */
const armdozerEffectDisabled: ArmdozerEffectsDisabled = {
  type: "ArmdozerEffectsDisabled",
  period: { type: "TurnLimit", remainingTurn: 2 },
};

test("攻撃ヒットかつ攻撃側に効果無視が適用されていない場合、ダメージ反射フローを実行しない", () => {
  const attacker = createAttacker([]);
  expect(
    canReflectFlow({ effect: attackHit, players: [defender, attacker] }),
  ).toBe(true);
});
