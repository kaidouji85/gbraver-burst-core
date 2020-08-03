// @flow

import test from 'ava';
import type {GameState, PlayerState} from "../../../../src";
import {EMPTY_PLAYER_STATE} from "../../../data/player";
import {EMPTY_GAME_STATE} from "../../../data/game-state";
import {recoverBattery} from "../../../../src/effect/pilot-skill/recover-battery";
import type {RecoverBatterySkill} from "../../../../src/player/pilot";

test('パイロットスキル バッテリー回復が正しく処理できる', t => {
  const invoker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {
      ...EMPTY_PLAYER_STATE.armdozer,
      maxBattery: 5,
      battery: 2,
    }
  };
  const skill: RecoverBatterySkill = {
    type: 'RecoverBatterySkill',
    recoverBattery: 2
  };
  const other: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: 'other'
  };
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [other, invoker]
  };

  const result = recoverBattery(state, invoker.playerId, skill);
  const expected: GameState = {
    ...state,
    players: [
      other,
      {
        ...invoker,
        armdozer: {
          ...invoker.armdozer,
          battery: 4
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