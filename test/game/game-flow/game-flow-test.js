// @flow

import test from 'ava';
import {GameFlow} from "../../../src/game/game-flow/game-flow";
import {EMPTY_GAME_STATE} from "../../../src";

test('ステート更新関数に引数には、自身がセットされている', t => {
  t.plan(1);

  const flow = new GameFlow([], EMPTY_GAME_STATE);
  flow.to(v => {
    t.is(v, flow);
    return new GameFlow([], EMPTY_GAME_STATE);
  });
});

test('ステート変更関数の更新結果が次に渡される', t => {
  t.plan(1);

  const flowA = new GameFlow([], EMPTY_GAME_STATE);
  const flowB = new GameFlow([], EMPTY_GAME_STATE);
  flowA.to(_ => flowB)
    .to(v => t.is(v, flowB));
});