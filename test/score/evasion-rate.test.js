// @flow
import {EMPTY_BATTLE, EMPTY_GAME_STATE, EMPTY_PLAYER_STATE} from "../../src";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit, PlayerId} from "../../src";
import {evasionRate} from "../../src/score/evasion-rate";

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

test('回避率を正しく計算できる', () => {
  const stateHistory = [
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    battle(attacker.playerId, criticalHit),
    battle(attacker.playerId, miss),
  ];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(1/4);
});

test('小数点4桁以降は切り捨てる', () => {
  const stateHistory = [
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    battle(attacker.playerId, miss),
  ];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(0.333);
});

test('フェイントは無視する', () => {
  const stateHistory = [
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    battle(attacker.playerId, criticalHit),
    battle(attacker.playerId, miss),
    battle(attacker.playerId, feint),
  ];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(1/4);
});

test('相手の攻撃以外のステートは無視する', () => {
  const stateHistory = [
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
    battle(attacker.playerId, normalHit),
    battle(attacker.playerId, guard),
    EMPTY_GAME_STATE,
    battle(attacker.playerId, criticalHit),
    battle(attacker.playerId, miss),
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
    battle(defender.playerId, normalHit),
    battle(defender.playerId, guard),
    battle(defender.playerId, criticalHit),
    battle(defender.playerId, miss),
  ];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(1/4);
});

test('ステートヒストリーが0件の場合は回避率100%とみなす', () => {
  const stateHistory = [];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(1);
});

test('相手攻撃のステートヒストリーが0件の場合には回避率100%とみなす', () => {
  const stateHistory = [
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
    battle(defender.playerId, normalHit),
    battle(defender.playerId, guard),
    battle(defender.playerId, criticalHit),
    battle(defender.playerId, miss),
    EMPTY_GAME_STATE,
    EMPTY_GAME_STATE,
  ];
  expect(evasionRate(stateHistory, defender.playerId)).toBe(1);
});