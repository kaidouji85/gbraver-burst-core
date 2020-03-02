// @flow

import test from 'ava';
import {isDeath} from "../../../src/player/is-death";
import type {PlayerState} from "../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../data/player";
import {EMPTY_ARMDOZER} from "../../data/armdozer";

test('HPが0の場合、死亡したと判定する', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 0
    }
  };
  const result = isDeath(defender);
  t.true(result);
});

test('HPが0より小さい場合、死亡したと判定する', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: -1000
    }
  };
  const result = isDeath(defender);
  t.true(result);
});

test('HPが0より大きい場合、死亡していない', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER,
      hp: 1000
    }
  };
  const result = isDeath(defender);
  t.false(result);
});