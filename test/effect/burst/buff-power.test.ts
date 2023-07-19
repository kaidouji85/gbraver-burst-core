import path from "path";

import { EMPTY_ARMDOZER_EFFECT, type GameState, type PlayerState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burstPlayer",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 1,
    maxBattery: 5,
    effects: [
      EMPTY_ARMDOZER_EFFECT,
      EMPTY_ARMDOZER_EFFECT,
    ],
    enableBurst: true,
    burst: {
      type: "BuffPower",
      recoverBattery: 3,
      buffPower: 1000,
      duration: 2,
    },
  },
};

/** それ以外のプレイヤー */
const otherPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "otherPlayer",
};

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  players: [otherPlayer, burstPlayer],
};

test("攻撃力バフが正しく適用される", () => {
  const result = burst(lastState, burstPlayer.playerId);
  const snapShotPath = path.join(__dirname, "buff-power.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
