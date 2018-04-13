// @flow
import test from 'ava';
import {start} from "../src/index";
import {ArmDozerIdList, ArmDozers} from "../src/master/armdozers";
import type {GameState} from "../src/game/game-state";
import {PhaseNameList} from "../src/game/phase-name";

test('初期状態を正しく作ることができる', t => {
  const player1 = {
    playerId: 'player1',
    armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const player2 = {
    playerId: 'player2',
    armDozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  };
  const result: GameState[] = start(player1, player2);
  t.is(result.length, 1);
  t.is(result[0].phase, PhaseNameList.COMMAND_PHASE);

  t.pass();
});