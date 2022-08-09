// @flow

import type {GameState, PlayerState} from "../../../src";
import {pilotSkill} from "../../../src/effect/pilot-skill";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PILOT} from "../../../src/empty/pilot";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {RecoverBatterySkill} from "../../../src/player/pilot";

test('パイロットスキルを正しく処理できる', () => {
  const skill: RecoverBatterySkill = {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  };
  const invoker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      maxBattery: 5,
      battery: 2,
    },
    pilot: {
      ...EMPTY_PILOT,
      skill: skill,
      enableSkill: true
    }
  };
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'other'
  };
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [other, invoker]
  };

  const result = pilotSkill(state, invoker.playerId);
  const expected: GameState = {
    ...state,
    players: [
      other,
      {
        ...invoker,
        armdozer: {
          ...invoker.armdozer,
          battery: 4,
        },
        pilot: {
          ...invoker.pilot,
          enableSkill: false
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