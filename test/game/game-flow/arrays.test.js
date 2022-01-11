// @flow

import {EMPTY_GAME_STATE} from "../../../src";
import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {arrays} from "../../../src/game/game-flow/arrays";
import {upcastGameState as up} from "../../../src/state/game-state";

test('ゲームステート配列を正しく結合できる', () => {
  const s1 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const s2 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const s3 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const s4 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const s5 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const flowA = new GameFlow([s1, s2], s2);
  const result = flowA.to(arrays([s3, s4, s5]));
  expect(result.lastState).toEqual(s5);
  expect(result.stateHistory).toEqual([s1, s2, s3, s4, s5]);
});

test('空配列を結合する場合、状態は何も変わらない', () => {
  const s1 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const s2 = up({...EMPTY_GAME_STATE, activePlayerId: 's1'});
  const flowA = new GameFlow([s1, s2], s2);
  const result = flowA.to(arrays([]));
  expect(result).toEqual(flowA);
});