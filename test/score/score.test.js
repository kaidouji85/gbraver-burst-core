// @flow
import {EMPTY_BATTLE, EMPTY_GAME_STATE, EMPTY_PLAYER_STATE} from "../../src";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit, PlayerId} from "../../src";
import {score} from "../../src/score/score";

const player = {...EMPTY_PLAYER_STATE, playerId: 'player'};
const enemy = {...EMPTY_PLAYER_STATE, playerId: 'enemy'};
const battle = (attacker: PlayerId, result: BattleResult) => {
  const effect = {...EMPTY_BATTLE, attacker, result};
  return {...EMPTY_GAME_STATE, effect};
};
const normalHit: NormalHit = {name: 'NormalHit', damage: 2000};
const guard: Guard = {name: 'Guard', damage: 1000};
const criticalHit: CriticalHit = {name: 'CriticalHit', damage: 4000};
const miss: Miss = {name: 'Miss'};
const feint: Feint = {name: 'Feint', isDefenderMoved: true};

test('スコア計算が正しくできる', () => {
  const stateHistory = [
    battle(player.playerId, normalHit),
    battle(enemy.playerId, miss),
    battle(player.playerId, miss),
    battle(enemy.playerId, feint),
    battle(player.playerId, guard),
    battle(enemy.playerId, criticalHit),
    battle(player.playerId, criticalHit),
  ];
  expect(score(stateHistory, player.playerId)).toEqual({
    hitRate: 3/4,
    hitRateScore: 3/4 * 10000,
    evasionRate: 1/2,
    evasionRateScore: 1/2 * 30000,
  });
});

test('スコア計算に関係ないステートヒストリーが含まれていても、正しく計算できる', () => {
  const stateHistory = [
    EMPTY_GAME_STATE,
    battle(player.playerId, normalHit),
    EMPTY_GAME_STATE,
    battle(enemy.playerId, miss),
    EMPTY_GAME_STATE,
    battle(player.playerId, miss),
    EMPTY_GAME_STATE,
    battle(enemy.playerId, criticalHit),
    EMPTY_GAME_STATE,
  ];
  expect(score(stateHistory, player.playerId)).toEqual({
    hitRate: 1/2,
    hitRateScore: 1/2 * 10000,
    evasionRate: 1/2,
    evasionRateScore: 1/2 * 30000,
  });
});

test('空のステートヒストリーでは全スコアを0点とみなす', () => {
  const stateHistory = [];
  expect(score(stateHistory, player.playerId)).toEqual({
    hitRate: 0,
    hitRateScore: 0,
    evasionRate: 0,
    evasionRateScore: 0,
  });
});