import path from "path";

import {
  EMPTY_ARMDOZER_EFFECT,
  type GameState,
  type PlayerState,
} from "../../../src";
import { pilotSkill } from "../../../src/effect/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PILOT } from "../../../src/empty/pilot";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";
import {DamageHalvedSkill} from "../../../src/player/pilot/damage-halved-skill";

/** スキル ダメージ半減 */
const skill: DamageHalvedSkill = {
  type: "DamageHalvedSkill",
  duration: 1,
};

/** スキル発動者 */
const invoker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT],
  },
  pilot: { ...EMPTY_PILOT, skill, enableSkill: true },
};

/** それ以外のプレイヤー */
const other: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "other" };

/** ゲームステート */
const state: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: invoker.playerId,
  players: [other, invoker],
};

test("ダメージ半減スキルが正しく発動できる", () => {
  const result = pilotSkill(state, invoker.playerId);
  const snapShotPath = path.join(__dirname, "damage-halved-skill.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
