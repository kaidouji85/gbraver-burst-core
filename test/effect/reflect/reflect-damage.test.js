// @flow
import type {PlayerState} from "../../../src";
import type {ReflectParam} from "../../../src/effect/reflect/reflect";
import {reflectDamage} from "../../../src/effect/reflect/reflect";
import {EMPTY_ARMDOZER_STATE} from "../../../src/empty/armdozer";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";

test('反射するダメージを正しく計算できる', () => {
  const reflect: ReflectParam = {damage: 1500, effect: 'Lightning'};
  const player: PlayerState = EMPTY_PLAYER_STATE;
  const result = reflectDamage(reflect, player);
  expect(result).toBe(1500);
});

test('ダメージ半減の効果が適用される', () => {
  const reflect: ReflectParam = {damage: 1500, effect: 'Lightning'};
  const player: PlayerState = {...EMPTY_PLAYER_STATE,
    armdozer: {...EMPTY_ARMDOZER_STATE,
      effects: [{
        type: 'DamageHalved',
        period: {type: 'TurnLimit', remainingTurn: 1}
      }]
    }
  };
  const result = reflectDamage(reflect, player);
  expect(result).toBe(750);
});