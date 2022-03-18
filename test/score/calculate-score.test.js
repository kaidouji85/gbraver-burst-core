// @flow
import {EMPTY_BATTLE, EMPTY_GAME_STATE, EMPTY_PLAYER_STATE} from "../../src";
import type {BattleResult, CriticalHit, Feint, Guard, Miss, NormalHit, PlayerId} from "../../src";
import {calculateScore} from "../../src/score/score";

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
  const hitRate = 3/4;
  const hitRateScore = hitRate * 10000;
  const evasionRate = 1/2;
  const evasionRateScore = evasionRate * 30000;
  const totalScore = hitRateScore + evasionRateScore;
  expect(calculateScore(stateHistory, player.playerId))
    .toEqual({hitRate, hitRateScore, evasionRate, evasionRateScore, totalScore});
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
  const hitRate = 1/2;
  const hitRateScore = hitRate * 10000;
  const evasionRate = 1/2;
  const evasionRateScore = evasionRate * 30000;
  const totalScore = hitRateScore + evasionRateScore;
  expect(calculateScore(stateHistory, player.playerId))
    .toEqual({hitRate, hitRateScore, evasionRate, evasionRateScore, totalScore});
});

test('空のステートヒストリーでは全スコアを0点とみなす', () => {
  const stateHistory = [];
  expect(calculateScore(stateHistory, player.playerId)).toEqual({
    hitRate: 0,
    hitRateScore: 0,
    evasionRate: 0,
    evasionRateScore: 0,
    totalScore: 0
  });
});