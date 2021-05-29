// @flow
import test from 'ava';
import {getFirstTurnPlayer} from "../../../src/effect/start-game/first-turn-payer";
import type {PlayerState} from "../../../src/state/player-state";
import type {PlayerId} from "../../../src/player/player";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";

test('スピードが高いプレイヤーが先行', t => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {...EMPTY_ARMDOZER_STATE, speed: 3000}
  };
  const player2: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {...EMPTY_ARMDOZER_STATE, speed: 1000}
  };

  const ret1: PlayerId = getFirstTurnPlayer(player1, player2);
  const ret2: PlayerId = getFirstTurnPlayer(player2, player1);
  t.is(ret1, player1.playerId);
  t.is(ret2, player1.playerId);
});

test('スピードが同じ場合にはランダムで先行を決定', t => {
  const player1: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player1',
    armdozer: {...EMPTY_ARMDOZER_STATE, speed: 1000}
  };
  const player2: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'player2',
    armdozer: {...EMPTY_ARMDOZER_STATE, speed: 1000}
  };

  const ret: PlayerId = getFirstTurnPlayer(player1, player2);
  t.true([player1.playerId, player2.playerId].includes(ret));
});
