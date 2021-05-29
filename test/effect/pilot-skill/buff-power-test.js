// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../src";
import {EMPTY_PLAYER_STATE} from "../../../src/empty-data/player";
import {EMPTY_GAME_STATE} from "../../../src/empty-data/game-state";
import type {BuffPowerSkill} from "../../../src/player/pilot";
import {buffPower} from "../../../src/effect/pilot-skill/buff-power";

test('攻撃バフスキルが正しく処理できる', t => {
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
    type: 'BuffPowerSkill',
    buffPower: 600,
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

  const result = buffPower(state, invoker.playerId, skill);
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
              type: 'CorrectPower',
              power: 600,
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