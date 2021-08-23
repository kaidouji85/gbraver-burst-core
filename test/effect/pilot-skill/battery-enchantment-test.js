// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {BatteryEnchantmentSkill} from "../../../src/player/pilot";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {batteryEnchantment} from "../../../src/effect/pilot-skill/battery-enchantment";

test('バッテリー増強スキルが正しく発動できる', t => {
  const invoker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      maxBattery: 5,
      battery: 2,
    }
  };
  const skill: BatteryEnchantmentSkill = {
    type: 'BatteryEnchantmentSkill',
    batteryEnchantment: 1,
  };
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'other'
  };
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [other, invoker]
  };

  const result = batteryEnchantment(state, invoker.playerId, skill);
  const expected = {
    ...state,
    players: [
      other,
      {
        ...invoker,
        armdozer: {
          ...invoker.armdozer,
          effects: [
            ...invoker.armdozer.effects,
            {
              type: 'BatteryCorrection',
              batteryCorrection: 1,
              remainingTurn: 1,
            }
          ]
        }
      }
    ],
    effect: {
      name: 'PilotSkillEffect',
      invokerId: invoker.playerId,
      skill: skill
    }
  };
  t.deepEqual(result, expected);
});