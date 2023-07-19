import path from "path";

import { EMPTY_ARMDOZER_EFFECT, type GameState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerState } from "../../../src/state/player-state";
import {
  exportSnapShotJSON,
  importSnapShotJSON,
  shouldUpdateSnapShot,
} from "../../snap-shot";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burst",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    enableBurst: true,
    battery: 1,
    maxBattery: 5,
    effects: [
      EMPTY_ARMDOZER_EFFECT,
      EMPTY_ARMDOZER_EFFECT,
    ],
    burst: {
      type: "LightningBarrier",
      damage: 1000,
      duration: 2,
      recoverBattery: 3,
    },
  },
};

/** それ以外のプレイヤー */
const otherPlayer: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "other" };

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  players: [otherPlayer, burstPlayer],
};

test("電撃バリアバーストの適用が正しくできる", () => {
  const result = burst(lastState, burstPlayer.playerId);
  const snapShotPath = path.join(__dirname, "lightning-barrier.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot()
    ? result
    : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
