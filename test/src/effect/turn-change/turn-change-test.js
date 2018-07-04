// @flow

import test from 'ava';
import {turnChange} from "../../../../src/effect/turn-change";
import type {PlayerState} from "../../../../src/game-state/player-state";
import {EMPTY_ARMDOZER} from "../../../data/empty-armdozer";
import {createArmdozerState} from "../../../../src/game-state/armdozer-state";
import type {GameState} from "../../../../src/game-state/game-state";
import {inspect} from 'util';

const PLAYER1: PlayerState = {
  playerId: 'player1',
  armdozer: {
    ...createArmdozerState({...EMPTY_ARMDOZER}),
    battery: 2,
    maxBattery: 5
  }
};

const PLAYER2: PlayerState = {
  playerId: 'player2',
  armdozer: {
    ...createArmdozerState({...EMPTY_ARMDOZER}),
    battery: 2,
    maxBattery: 5
  }
};

const LAST_STATE: GameState = {
  players: [PLAYER1, PLAYER2],
  activePlayerId: 'player1',
  effect: {name: 'START_GAME'}
};

test('ターンチェンジが正しくできる', t => {
  const updated = turnChange(LAST_STATE);
  const updatedPlayer1 = updated.players.find(v => v.playerId === PLAYER1.playerId);
  const updatedPlayer2 = updated.players.find(v => v.playerId === PLAYER2.playerId);

  if (!updatedPlayer1 || !updatedPlayer2) {
    t.fail('プレイヤー1、プレイヤー2が更新結果に含まれていません');
    return;
  }
  t.is(updated.activePlayerId, 'player2', '攻撃プレイヤーが変更されている');
  t.is(updatedPlayer2.armdozer.battery, 5, 'ターンチェンジしたプレイヤーのバッテリーが回復する');
  t.is(updatedPlayer1.armdozer.battery, 2, '前回攻撃したプレイヤーのバッテリーは回復しない');
});