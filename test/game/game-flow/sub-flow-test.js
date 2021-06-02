// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../src";
import {GameFlowWithHistory} from "../../../src/game/game-flow/game-flow";
import {subFlow} from "../../../src/game/game-flow/sub-flow";

test('別々のゲームフローをつなげることができる', t => {
  const s1 = {...EMPTY_GAME_STATE, playerId: 'state01'};
  const s2 = {...EMPTY_GAME_STATE, playerId: 'state02'};
  const s3 = {...EMPTY_GAME_STATE, playerId: 'state03'};
  const s4 = {...EMPTY_GAME_STATE, playerId: 'state04'};
  const s5 = {...EMPTY_GAME_STATE, playerId: 'state05'};
  const flowA = new GameFlowWithHistory([s1, s2, s3], s3);
  const flowB = new GameFlowWithHistory([s4, s5], s5);

  const result = flowA.to(subFlow(() => flowB));
  t.deepEqual(result.stateHistory, [s1, s2, s3, s4, s5]);
});

