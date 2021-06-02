// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../src";
import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {subFlow} from "../../../src/game/game-flow/sub-flow";

test('別々のゲームフローをつなげることができる', t => {
  const s1 = {...EMPTY_GAME_STATE, activePlayerId: 'state01'};
  const s2 = {...EMPTY_GAME_STATE, activePlayerId: 'state02'};
  const s3 = {...EMPTY_GAME_STATE, activePlayerId: 'state03'};
  const s4 = {...EMPTY_GAME_STATE, activePlayerId: 'state04'};
  const s5 = {...EMPTY_GAME_STATE, activePlayerId: 'state05'};
  const flowA = new GameFlow([s1, s2, s3], s3);
  const flowB = new GameFlow([s4, s5], s5);

  const result = flowA.to(subFlow(() => flowB));
  t.deepEqual(result.stateHistory, [s1, s2, s3, s4, s5]);
  t.deepEqual(result.lastState, s5);
});

