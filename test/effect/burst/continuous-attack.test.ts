import path from "path";

import type { GameState, PlayerState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";

test("連続攻撃バーストが正しく適用できる", () => {
  const burstPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "burstPlayer",
    armdozer: { ...EMPTY_PLAYER_STATE.armdozer,
      battery: 1,
      maxBattery: 5,
      effects: [],
      enableBurst: true,
      burst: {
        type: "ContinuousAttack",
        recoverBattery: 3
      }
    }
  };
  const otherPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "otherPlayer"
  };
  const lastState: GameState = { ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer]
  };
  const result = burst(lastState, burstPlayer.playerId);
  const snapShotPath = path.join(__dirname, "continuous-attack.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});