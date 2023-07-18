import path from "path";

import { BatteryBoostSkill, EMPTY_ARMDOZER_STATE, EMPTY_GAME_STATE, EMPTY_PLAYER_STATE } from "../../../src";
import { batteryBoost } from "../../../src/effect/pilot-skill/battery-boost";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";

/** 効果発動プレイヤー */
const invoker = {
  ...EMPTY_PLAYER_STATE,
  playerId: "invoker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 0,
    maxBattery: 8,
  }
};

/** それ以外のプレイヤー */
const other = {
  ...EMPTY_PLAYER_STATE,
  playerId: "other",
};

/** ゲームステート */
const lastState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: other.playerId,
  players: [invoker, other]
};

/** コマンド */
const skill: BatteryBoostSkill = {
  type: "BatteryBoostSkill",
  recoverBattery: 5,
};

test("バッテリーブーストスキルを正しく適用できる", () => {
  const result = batteryBoost(lastState, invoker.playerId, skill);
  const snapShotPath = path.join(__dirname, "battery-boost.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});