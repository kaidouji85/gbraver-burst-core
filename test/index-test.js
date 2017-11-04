// @flow
import test from 'ava';
import {createInitialState} from "../src/index";
import {ArmDozerIdList} from "../src/master/armdozers";

test('初期状態を正しく作ることができる', t => {
  const player1 = {
    playerId: 'player1',
    armDozerId: ArmDozerIdList.SHIN_BRAVER
  };
  const player2 = {
    playerId: 'player2',
    armDozerId: ArmDozerIdList.NEO_LANDOZER
  };
  createInitialState(player1, player2);

  t.pass();
});