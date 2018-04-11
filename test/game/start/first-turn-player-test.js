// @flow
import test from 'ava';
import {getFirstTurnPlayer} from "../../../src/game/start/first-turn-payer";
import {ArmDozerIdList} from "../../../src/master/armdozers";
import type {PlayerGameState} from "../../../src/player/player-game-state";
import type {ArmdozerGameState} from "../../../src/armdozer/armdozer-game-state";
import type {PlayerId} from "../../../src/player/player";

const TEST_ARMDOZER: ArmdozerGameState = {
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
  const player1: PlayerGameState = {
    playerId: 'player1',
    armDozer: {...TEST_ARMDOZER, speed: 3000}
  };
  const player2: PlayerGameState = {
    playerId: 'player2',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret1: PlayerId = getFirstTurnPlayer(player1, player2);
  const ret2: PlayerId = getFirstTurnPlayer(player2, player1);
  t.is(ret1, player1.playerId);
  t.is(ret2, player1.playerId);
});

test('スピードが同じ場合にはランダムで先行を決定', t => {
  const player1: PlayerGameState = {
    playerId: 'player1',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };
  const player2: PlayerGameState = {
    playerId: 'player2',
    armDozer: {...TEST_ARMDOZER, speed: 1000}
  };

  const ret: PlayerId = getFirstTurnPlayer(player1, player2);
  t.true([player1.playerId, player2.playerId].includes(ret));
});
