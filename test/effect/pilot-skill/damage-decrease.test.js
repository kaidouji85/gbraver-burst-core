// @flow

import type {GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {damageDecrease} from "../../../src/effect/pilot-skill/damage-decrease";
import type {DamageDecreaseSkill} from "../../../src/player/pilot";

test('ダメージ減少スキルが正しく発動できる', () => {
  const invoker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      maxBattery: 5,
      battery: 2,
    }
  };
  const skill: DamageDecreaseSkill = {
    type: 'DamageDecreaseSkill',
    decrease: 600,
    duration: 2
  };
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'other'
  };
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [other, invoker]
  };

  const result = damageDecrease(state, invoker.playerId, skill);
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
              type: 'DamageDecrease',
              decrease: 600,
              period: {
                type: 'TurnLimit',
                remainingTurn: 2,
              }
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
  expect(result).toEqual(expected);
});