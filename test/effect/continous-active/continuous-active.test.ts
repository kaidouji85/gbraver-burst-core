import path from "path";

import {
  type ArmdozerEffect,
  type BatteryRecoverSkip,
  type ContinuousActivePlayer,
  EMPTY_ARMDOZER_EFFECT,
  type GameState,
  type PlayerState,
} from "../../../src";
import { continuousActive } from "../../../src/effect/continuous-active";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

/** 効果 アクティブプレイヤー継続 */
const CONTINUOUS_ACTIVE: ContinuousActivePlayer = {
  type: "ContinuousActivePlayer",
  period: {
    type: "SpecialPeriod",
  },
};

/** 効果 ターン開始時バッテリー回復スキップ */
const BATTERY_RECOVER_SKIP: BatteryRecoverSkip = {
  type: "BatteryRecoverSkip",
  period: {
    type: "SpecialPeriod",
  },
};

/**
 * 攻撃側プレイヤーを生成する
 * @param battery 現在のバッテリー値
 * @param effects 現在の効果
 * @return 生成結果
 */
const createAttacker = (
  battery: number,
  effects: ArmdozerEffect[],
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
    effects: [EMPTY_ARMDOZER_EFFECT, EMPTY_ARMDOZER_EFFECT, ...effects],
  },
});

/** 防御側プレイヤー */
const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 5,
    effects: [CONTINUOUS_ACTIVE],
  },
};

test("アクティブプレイヤー継続が正しく処理できる", () => {
  const attacker = createAttacker(2, [CONTINUOUS_ACTIVE]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = continuousActive(lastState);
  const snapShotPath = path.join(__dirname, "continuous-active.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});

test("BatteryRecoverSkipは取り除かれる", () => {
  const attacker = createAttacker(2, [CONTINUOUS_ACTIVE, BATTERY_RECOVER_SKIP]);
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const result = continuousActive(lastState);
  const snapShotPath = path.join(
    __dirname,
    "continuous-active__battery-recover-skip.json",
  );
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
