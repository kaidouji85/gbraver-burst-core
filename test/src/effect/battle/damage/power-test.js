//@flow

import test from 'ava';
import {EMPTY_PLAYER_STATE} from "../../../../data/player";
import type {PlayerState} from "../../../../../src/game-state/player-state";
import {power} from "../../../../../src/effect/battle/damage/power";
import {EMPTY_ARMDOZER_STATE} from "../../../../data/armdozer";
import {EMPTY_CORRECT_POWER} from "../../../../data/amrdozer-effect";

test('アームドーザの攻撃力 + 攻撃力補正 = 基礎攻撃力となる', t => {
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2000,
      effects: [
        {...EMPTY_CORRECT_POWER, power: 1000}
      ]
    }
  };
  const result = power(player);
  t.is(result, 3000);
});

test('攻撃力補正が複数存在する場合、その合計が補正値となる', t => {
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      power: 2100,
      effects: [
        {...EMPTY_CORRECT_POWER, power: 1000},
        {...EMPTY_CORRECT_POWER, power: -500},
        {...EMPTY_CORRECT_POWER, power: 2000},
      ]
    }
  };
  const result = power(player);
  t.is(result, 4600);
});