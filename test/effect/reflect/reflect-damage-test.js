// @flow

import test from 'ava';
import type {ReflectParam} from "../../../src/effect/reflect/reflect";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import type {PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {reflectDamage} from "../../../src/effect/reflect/reflect";

test('反射するダメージを正しく計算できる', t => {
  const reflect: ReflectParam = {
    damage: 1500,
    effect: 'Lightning'
  };
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
  };
  const result = reflectDamage(reflect, player);
  t.is(result, 1500);
});

test('ダメージ減少だけ反射ダメージが減る', t => {
  const reflect: ReflectParam = {
    damage: 1500,
    effect: 'Lightning'
  };
  const player: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      effects: [
        {
          type: 'DamageDecrease',
          decrease: 600,
          remainingTurn: 1
        }
      ]
    }
  };
  const result = reflectDamage(reflect, player);
  t.is(result, 900);
});