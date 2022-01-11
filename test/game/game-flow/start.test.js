// @flow

import {start} from "../../../src/game/game-flow/start";
import {EMPTY_GAME_STATE} from "../../../src";

test('ゲームフローを正しく始めることができる', () => {
  const flow = start(EMPTY_GAME_STATE);
  expect(flow.lastState).toEqual(EMPTY_GAME_STATE);
  expect(flow.stateHistory).toEqual([EMPTY_GAME_STATE]);
});