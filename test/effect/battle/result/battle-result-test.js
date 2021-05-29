// @flow

import test from 'ava';
import type {PlayerState} from "../../../../src/state/player-state";
import {battleResult} from "../../../../src/effect/battle/result/battle-result";
import {EMPTY_PLAYER_STATE} from "../../../../src/empty/player";

const ATTACKER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'player1',
};

const DEFENDER: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'player2',
};

test('防御バッテリー < 攻撃バッテリー なら攻撃ヒット', t => {
  const result = battleResult(ATTACKER, 3, DEFENDER, 2);
  t.is(result.name, 'NormalHit');
});

test('防御バッテリー = 攻撃バッテリー なら防御', t => {
  const result = battleResult(ATTACKER, 3, DEFENDER, 3);
  t.is(result.name, 'Guard');
});

test('攻撃バッテリー < 防御バッテリー  ならミス', t => {
  const result = battleResult(ATTACKER, 1, DEFENDER, 3);
  t.is(result.name, 'Miss');
});

test('攻撃バッテリーが1以上 and 防御バッテリーが0 ならクリティカルヒット', t => {
  const result = battleResult(ATTACKER, 4, DEFENDER, 0);
  t.is(result.name, 'CriticalHit');
});

test('攻撃バッテリーが0ならフェイント', t => {
  const result = battleResult(ATTACKER, 0, DEFENDER, 0);
  t.is(result.name, 'Feint');
});
