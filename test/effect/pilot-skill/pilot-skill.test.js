// @flow
import path from "path";
import type {GameState, PlayerState} from "../../../src";
import {pilotSkill} from "../../../src/effect/pilot-skill";
import {EMPTY_GAME_STATE} from "../../../src/empty/game-state";
import {EMPTY_PILOT} from "../../../src/empty/pilot";
import {EMPTY_PLAYER_STATE} from "../../../src/empty/player";
import type {RecoverBatterySkill} from "../../../src/player/pilot";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

test('パイロットスキルを正しく適用できる', () => {
  const skill: RecoverBatterySkill = {type: 'RecoverBatterySkill', recoverBattery: 2};
  const invoker: PlayerState = {...EMPTY_PLAYER_STATE,
    playerId: 'invoker',
    armdozer: {...EMPTY_PLAYER_STATE.armdozer, maxBattery: 5, battery: 2,},
    pilot: {...EMPTY_PILOT, skill: skill, enableSkill: true}
  };
  const other: PlayerState = {...EMPTY_PLAYER_STATE, playerId: 'other'};
  const state: GameState = {...EMPTY_GAME_STATE, players: [other, invoker]};
  const result = pilotSkill(state, invoker.playerId);
  const snapShotPath = path.join(__dirname, 'pilot-skill__recover-battery.json');
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});