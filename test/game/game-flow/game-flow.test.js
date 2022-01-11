// @flow

import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {EMPTY_GAME_STATE} from "../../../src";

test('ステート更新関数の引数には、自身がセットされている', () => {
  const flow = new GameFlow([], EMPTY_GAME_STATE);
  flow.to(v => {
    expect(v).toBe(flow);
    return v;
  });
});

test('toでchainした結果が、ステート更新関数の引数とセットされている', () => {
  const flowA = new GameFlow([], EMPTY_GAME_STATE);
  const flowB = new GameFlow([], EMPTY_GAME_STATE);
  flowA.to(() => flowB)
    .to(v => {
      expect(v).toBe(flowB);
      return v;
    });
});