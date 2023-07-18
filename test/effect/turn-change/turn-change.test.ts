import path from "path";

import { BatteryRecoverSkip } from "../../../src";
import { turnChange } from "../../../src/effect/turn-change";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { GameState } from "../../../src/state/game-state";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";

/** 効果 ターン開始時バッテリー回復スキップ */
const batteryRecoverSkip: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "Permanent",
  }
};

/** 攻撃側プレイヤー */
const attacker = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: [],
  },
};

/**
 * 防御側プレイヤーを生成する
 * @param battery 現在のバッテリー値
 * @param hasBatteryRecoverSkip バッテリー回復スキップ状態か否か、trueでスキップ状態
 * @return 生成結果
 */
const createDefender = (battery: number, hasBatteryRecoverSkip: boolean) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects: hasBatteryRecoverSkip
      ? [ batteryRecoverSkip ]
      : [],
  },
});

test("ターン交代が正しく処理できる", () => {
  const defender = createDefender(2, false);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = turnChange(lastState);
  const snapShotPath = path.join(__dirname, "turn-change.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("BatteryRecoverSkipがある場合は、バッテリー回復しない", () => {
  const defender = createDefender(2, true);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = turnChange(lastState);
  const snapShotPath = path.join(__dirname, "turn-change__battery-recover-skip.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});