import path from "path";
import { EMPTY_GAME_STATE, GameState, PlayerState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";

test("バッテリーリミットブレイクが正しく適用できる", () => {
  const burstPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "burstPlayer",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      battery: 2,
      maxBattery: 4,
      burst: {
        type: "BatteryLimitBreak",
        recoverBattery: 8,
        maxBattery: 8
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
  const snapShotPath = path.join(__dirname, "battery-limit-break.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});