// @flow
import test from 'ava';
import {getFirstTurnPlayer} from "../../../src/game/inital-state/first-turn-payer";
import {ArmDozerIdList} from "../../../src/master/armdozers";
import type {PlayerState} from "../../../src/player/player-state";
import type {ArmDozerBattleStatus} from "../../../src/armdozer/armdozer-battle-status";
import type {PlayerId} from "../../../src/player/player-state";

const TEST_ARMDOZER: ArmDozerBattleStatus = {
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
    armDozer: {...TEST_ARMDOZER, speed: 3000}
  };
  const player2: PlayerState = {
    playerId: 'player2',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret1: PlayerId = getFirstTurnPlayer(player1, player2);
  const ret2: PlayerId = getFirstTurnPlayer(player2, player1);
  t.is(ret1, player1.playerId);
  t.is(ret2, player1.playerId);
});

test('スピードが同じ場合にはランダムで先行を決定', t => {
  const player1: PlayerState = {
    playerId: 'player1',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };
  const player2: PlayerState = {
    playerId: 'player2',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret: PlayerId = getFirstTurnPlayer(player1, player2);
  t.true([player1.playerId, player2.playerId].includes(ret));
});
