// @flow
import test from 'ava';
import {start} from "../src/index";
import {ArmDozerIdList, ArmDozers} from "../src/master/armdozers";
import {PhaseNameList} from "../src/phase/phase-name";
import type {Player} from "../src/player/player";
import * as util from "util";
import type {GameState} from "../src/game-state/game-state";

test('初期状態を正しく作ることができる', t => {
  const player1: Player = {
    playerId: 'player1',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.SHIN_BRAVER) || ArmDozers[0]
  };
  const player2: Player = {
    playerId: 'player2',
    armdozer: ArmDozers.find(v => v.id === ArmDozerIdList.NEO_LANDOZER) || ArmDozers[0]
  };
  const result: GameState[] = start(player1, player2);
  console.log(util.inspect(result, {depth: null}));
  t.is(result.length > 0, true);
  t.is(result[result.length - 1].phase, PhaseNameList.COMMAND_PHASE);

  t.pass();
});