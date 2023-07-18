import path from "path";

import { EMPTY_ARMDOZER_EFFECT, type GameState, type PlayerState } from "../../../src";
import { pilotSkill } from "../../../src/effect/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PILOT } from "../../../src/empty/pilot";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { BuffPowerSkill } from "../../../src/player/pilot";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

/** スキル 攻撃バフ */
const skill: BuffPowerSkill = {
  type: "BuffPowerSkill",
  buffPower: 600,
  duration: 2,
};

/** スキル発動者 */
const invoker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: { ...EMPTY_PLAYER_STATE.armdozer, effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT] },
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

test("攻撃バフスキルが正しく発動できる", () => {
  const result = pilotSkill(state, invoker.playerId);
  const snapShotPath = path.join(__dirname, "buff-power-skill.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
