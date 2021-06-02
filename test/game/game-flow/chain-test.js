// @flow

import test from 'ava';
import {chain} from '../../../src/game/game-flow/chain';
import {GameFlowWithHistory} from "../../../src/game/game-flow/game-flow";
import {EMPTY_GAME_STATE} from "../../../src";

test('ゲームステートを正しくチェインすることができる', t => {
  const s1 = {...EMPTY_GAME_STATE, playerId: 'state01'};
  const s2 = {...EMPTY_GAME_STATE, playerId: 'state02'};
  const s3 = {...EMPTY_GAME_STATE, playerId: 'state03'};
  const s4 = {...EMPTY_GAME_STATE, playerId: 'state04'};
  const flowA = new GameFlowWithHistory([s1, s2, s3], s3);
  const result = flowA.to(chain(() => s4));
  t.deepEqual(result.stateHistory, [s1, s2, s3, s4]);
});