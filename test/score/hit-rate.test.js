// @flow
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit, PlayerId} from "../../src";
import {EMPTY_BATTLE, EMPTY_GAME_STATE, EMPTY_PLAYER_STATE} from "../../src";
import {hitRate} from "../../src/score/hit-rate";

const attacker = {...EMPTY_PLAYER_STATE, playerId: 'attacker'};
const defender = {...EMPTY_PLAYER_STATE, playerId: 'defender'};
const battle = (attacker: PlayerId, result: BattleResult) => {
  const effect = {...EMPTY_BATTLE, attacker, result};
  return {...EMPTY_GAME_STATE, effect};
};
const normalHit: NormalHit = {name: 'NormalHit', damage: 2000};
const guard: Guard = {name: 'Guard', damage: 1000};
const criticalHit: CriticalHit = {name: 'CriticalHit', damage: 4000};
const miss: Miss = {name: 'Miss'};
const feint: Feint = {name: 'Feint', isDefenderMoved: true};

test('命中率が正しく計算できる', () => {
  const stateHistory = [
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    battle(attacker.playerId, criticalHit),
    battle(attacker.playerId, miss),
  ];
  expect(hitRate(stateHistory, attacker.playerId)).toBe(3/4);
});

test('フェイントは無視する', () => {
  const stateHistory = [
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    battle(attacker.playerId, criticalHit),
    battle(attacker.playerId, miss),
    battle(attacker.playerId, feint),
  ];
  expect(hitRate(stateHistory, attacker.playerId)).toBe(3/4);
});


test('計算対象プレイヤーの攻撃以外のステートは無視する', () => {
  const stateHistory = [
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
    battle(attacker.playerId, normalHit),
    EMPTY_GAME_STATE,
    battle(attacker.playerId, guard),
    battle(attacker.playerId, criticalHit),
    EMPTY_GAME_STATE,
    battle(attacker.playerId, miss),
    battle(defender.playerId, normalHit),
    EMPTY_GAME_STATE,
    battle(defender.playerId, guard),
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
  ];
  expect(hitRate(stateHistory, attacker.playerId)).toBe(3/4);
});

test('ステートヒストリーが0件の場合は命中率0%とみなす', () => {
  const stateHistory = [];
  expect(hitRate(stateHistory, attacker.playerId)).toBe(0);
});

test('自分攻撃のステートヒストリーが0件の場合には命中率0%とみなす', () => {
  const stateHistory = [
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
    battle(defender.playerId, normalHit),
    EMPTY_GAME_STATE,
    battle(defender.playerId, guard),
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
  ];
  expect(hitRate(stateHistory, attacker.playerId)).toBe(0);
});