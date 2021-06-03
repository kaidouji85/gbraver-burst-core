// @flow

import test from 'ava';
import {start} from "../../../src/game/game-flow/start";
import {EMPTY_GAME_STATE} from "../../../src";

test('ゲームフローを正しく始めることができる', t => {
  const flow = start(EMPTY_GAME_STATE);
  t.deepEqual(flow.lastState, EMPTY_GAME_STATE);
  t.deepEqual(flow.stateHistory, [EMPTY_GAME_STATE]);
});