// @flow

import test from 'ava';
import type {PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {canContinuousActive} from "../../../src/effect/continuous-active";

const continuousActivePlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'isContinuousActivePlayer',
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    effects: [{type: 'ContinuousActivePlayer', period: {type: 'Permanent'}}
    ]
  }
};

const noContinuousActivePlayer = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'noContinuousActivePlayer'
};

const otherPlayer = {
  ...EMPTY_PLAYER_STATE,
  playerId: 'otherPlayer'
};

test('攻撃側がアクティブプレイヤー継続を持つ場合、同効果は発動可能である', t => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [continuousActivePlayer, otherPlayer],
    activePlayerId: continuousActivePlayer.playerId
  };
  t.true(canContinuousActive(state));
});

test('防御側がアクティブプレイヤー継続を持つ場合、同効果は発動しない', t => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [continuousActivePlayer, otherPlayer],
    activePlayerId: otherPlayer.playerId
  };
  t.false(canContinuousActive(state));
});

test('攻撃側、防御側がアクティブプレイヤー継続を持たない場合、同効果は発動しない', t => {
  const state = {
    ...EMPTY_GAME_STATE,
    players: [noContinuousActivePlayer, otherPlayer],
    activePlayerId: noContinuousActivePlayer.playerId
  };
  t.false(canContinuousActive(state));
});