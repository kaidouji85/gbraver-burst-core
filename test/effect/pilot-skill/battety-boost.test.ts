import path from "path";

import {
  ArmdozerEffect,
  EMPTY_ARMDOZER_STATE,
  EMPTY_GAME_STATE,
  EMPTY_PILOT_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PlayerState,
} from "../../../src";
import { pilotSkill } from "../../../src/effect/pilot-skill";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

/** BatteryRecoverSkip以外の効果 */
const effectOtherThanBatteryRecoverSkip: ArmdozerEffect = {
  type: "CorrectPower",
  power: 1000,
  period: {
    type: "TurnLimit",
    remainingTurn: 1,
  },
};

/** 効果発動プレイヤー */
const invoker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 0,
    maxBattery: 8,
    effects: [
      effectOtherThanBatteryRecoverSkip,
      effectOtherThanBatteryRecoverSkip,
    ],
  },
  pilot: {
    ...EMPTY_PILOT_STATE,
    skill: {
      type: "BatteryBoostSkill",
      recoverBattery: 5,
    },
    enableSkill: true,
  },
};

/** それ以外のプレイヤー */
const other = {
  ...EMPTY_PLAYER_STATE,
  playerId: "other",
};

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: other.playerId,
  players: [invoker, other],
};

test("バッテリーブーストスキルを正しく適用できる", () => {
  const result = pilotSkill(lastState, invoker.playerId);
  const snapShotPath = path.join(__dirname, "battery-boost.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
