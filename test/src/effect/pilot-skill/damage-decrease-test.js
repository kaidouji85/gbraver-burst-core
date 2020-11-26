import test from 'ava';
import type {BuffPowerSkill, GameState, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {buffPower} from "../../../../src/effect/pilot-skill/buff-power";
import {damageDecrease} from "../../../../src/effect/pilot-skill/damage-decrease";

test('ダメージ減少スキルが正しく発動できる', t => {
  const invoker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      maxBattery: 5,
      battery: 2,
    }
  };
  const skill: BuffPowerSkill = {
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
              remainingTurn: 2,
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