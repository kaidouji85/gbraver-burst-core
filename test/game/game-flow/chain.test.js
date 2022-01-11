// @flow

import {chain} from '../../../src/game/game-flow/chain';
import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {EMPTY_GAME_STATE} from "../../../src";

test('ゲームステートを正しくチェインすることができる', () => {
  const s1 = {...EMPTY_GAME_STATE, activePlayerId: 'state01'};
  const s2 = {...EMPTY_GAME_STATE, activePlayerId: 'state02'};
  const s3 = {...EMPTY_GAME_STATE, activePlayerId: 'state03'};
  const s4 = {...EMPTY_GAME_STATE, activePlayerId: 'state04'};
  const flowA = new GameFlow([s1, s2, s3], s3);
  const result = flowA.to(chain(() => s4));
  expect(result.lastState).toEqual(s4);
  expect(result.stateHistory).toEqual([s1, s2, s3, s4]);
});