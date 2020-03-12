// @flow

import test from 'ava';
import type {PlayerState} from "../../../src/state/player-state";
import {isPlayerDeath} from "../../../src/state/player-state";
import {EMPTY_PLAYER_STATE} from "../../data/player";
import {EMPTY_ARMDOZER_STATE} from "../../data/armdozer";

test('HPが0の場合、死亡したと判定する', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 0
    }
  };
  const result = isPlayerDeath(defender);
  t.true(result);
});

test('HPが0より小さい場合、死亡したと判定する', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: -1000
    }
  };
  const result = isPlayerDeath(defender);
  t.true(result);
});

test('HPが0より大きい場合、死亡していない', t => {
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      hp: 1000
    }
  };
  const result = isPlayerDeath(defender);
  t.false(result);
});