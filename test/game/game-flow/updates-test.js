// @flow

import test from 'ava';
import {EMPTY_GAME_STATE} from "../../../src";
import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {upcastGameState as up} from "../../../src/state/game-state";
import {updates} from "../../../src/game/game-flow/updates";

test('配列でのステート更新ができる', t => {
  const s1 = {...EMPTY_GAME_STATE, activePlayerId: 'state01-'};
  const flowA = new GameFlow([s1], s1);
  const fnX = v => up({...v, activePlayerId: v.activePlayerId + 'X'});
  const fnY = v => up({...v, activePlayerId: v.activePlayerId + 'Y'});
  const fnZ = v => up({...v, activePlayerId: v.activePlayerId + 'Z'});
  const result = flowA.to(updates([fnX, fnY, fnZ, fnY, fnX]));
  const expectedLastState = {...EMPTY_GAME_STATE, activePlayerId: 'state01-XYZYX'}
  const expectedStateHistory = [
    s1,
    {...EMPTY_GAME_STATE, activePlayerId: 'state01-X'},
    {...EMPTY_GAME_STATE, activePlayerId: 'state01-XY'},
    {...EMPTY_GAME_STATE, activePlayerId: 'state01-XYZ'},
    {...EMPTY_GAME_STATE, activePlayerId: 'state01-XYZY'},
    {...EMPTY_GAME_STATE, activePlayerId: 'state01-XYZYX'}
  ];
  t.deepEqual(result.lastState, expectedLastState);
  t.deepEqual(result.stateHistory, expectedStateHistory);
});

test('空配列の場合、何も状態は変わらない', t => {
  const s1 = {...EMPTY_GAME_STATE, activePlayerId: 'state01-'};
  const flowA = new GameFlow([s1], s1);
  const result = flowA.to(updates([]));
  t.deepEqual(result, flowA);
});