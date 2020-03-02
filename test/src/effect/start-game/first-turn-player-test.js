// @flow
import test from 'ava';
import {getFirstTurnPlayer} from "../../../../src/effect/start-game/first-turn-payer";
import {ArmDozerIdList} from "../../../../src/master/armdozers";
import type {PlayerState} from "../../../../src/state/player-state";
import type {ArmdozerState} from "../../../../src/state/armdozer-state";
import type {PlayerId} from "../../../../src/player/player";

const TEST_ARMDOZER: ArmdozerState = {
  id: ArmDozerIdList.SHIN_BRAVER,
  name: 'test',
  hp: 3000,
  maxHp: 3000,
  battery: 5,
  maxBattery: 5,
  power: 2000,
  speed: 2000
};

test('スピードが高いプレイヤーが先行', t => {
  const player1: PlayerState = {
    playerId: 'player1',
    armdozer: {...TEST_ARMDOZER, speed: 3000}
  };
  const player2: PlayerState = {
    playerId: 'player2',
    armdozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret1: PlayerId = getFirstTurnPlayer(player1, player2);
  const ret2: PlayerId = getFirstTurnPlayer(player2, player1);
  t.is(ret1, player1.playerId);
  t.is(ret2, player1.playerId);
});

test('スピードが同じ場合にはランダムで先行を決定', t => {
  const player1: PlayerState = {
    playerId: 'player1',
    armdozer: {...TEST_ARMDOZER, speed: 1000}
  };
  const player2: PlayerState = {
    playerId: 'player2',
    armdozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret: PlayerId = getFirstTurnPlayer(player1, player2);
  t.true([player1.playerId, player2.playerId].includes(ret));
});
