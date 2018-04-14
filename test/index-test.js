// @flow
import test from 'ava';
import {start} from "../src/index";
import {ArmDozerIdList, ArmDozers} from "../src/master/armdozers";
import type {GameState} from "../src/game-state/index";
import {PhaseNameList} from "../src/phase/phase-name";

test('初期状態を正しく作ることができる', t => {
  const player1 = {
    playerId: 'player1',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const player2 = {
    playerId: 'player2',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  };
  const result: GameState = start(player1, player2);
  t.is(result.steps.length > 0, true);
  t.is(result.steps[result.steps.length - 1].openState.phase, PhaseNameList.COMMAND_PHASE);

  t.pass();
});