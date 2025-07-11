import { EMPTY_ARMDOZER_STATE } from "../../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { reflectFlow } from "../../../../src/game/progress/battle-flow/reflect-flow";
import { ArmdozerEffect } from "../../../../src/state/armdozer-effect";
import { PlayerState } from "../../../../src/state/player-state";

/** 攻撃側プレイヤー */
const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: { ...EMPTY_ARMDOZER_STATE, hp: 3000, maxHp: 3000 },
};

/**
 * 防御側プレイヤーを生成する
 * @param effects アームドーザ効果
 * @returns 防御側プレイヤー
 */
const createDefender = (effects: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: { ...EMPTY_ARMDOZER_STATE, hp: 3000, maxHp: 3000, effects },
});

/**
 * ダメージ反射効果を生成する
 * @param damage ダメージ
 * @returns ダメージ反射効果
 */
const createTryReflect = (damage: number): ArmdozerEffect => ({
  type: "TryReflect",
  damage,
  effect: "Lightning",
  period: { type: "TurnLimit", remainingTurn: 2 },
});

test("ダメージ反射が正しく適用される", () => {
  const defender = createDefender([createTryReflect(5000)]);
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: ATTACKER.playerId,
    players: [ATTACKER, defender],
  };
  const result = reflectFlow(lastState, "attacker");
  expect(result).toMatchSnapshot("single-reflect");
});

test("ダメージ反射の重ね掛けも正しく処理される", () => {
  const defender = createDefender([
    createTryReflect(5000),
    createTryReflect(3000),
    createTryReflect(2000),
  ]);
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: ATTACKER.playerId,
    players: [ATTACKER, defender],
  };
  const result = reflectFlow(lastState, "attacker");
  expect(result).toMatchSnapshot("multi-reflect");
});

test("防御側プレイヤーが見つからない場合は例外を投げる", () => {
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: ATTACKER.playerId,
    // テスト対象の関数は、攻撃側プレイヤーとIDが一致したいものを防御側とみなしている
    // 防御側プレイヤーが存在しない状況を再現するために、攻撃側プレイヤーのみを設定している
    players: [ATTACKER, ATTACKER],
  };
  expect(() => reflectFlow(lastState, "attacker")).toThrow();
});
