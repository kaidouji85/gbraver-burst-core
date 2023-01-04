import path from "path";
import type { GameState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import type { PlayerState } from "../../../src/state/player-state";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";
test("削除 バースト効果バッテリー回復が正しく適用される", () => {
  const burstPlayer = { ...EMPTY_PLAYER_STATE,
    playerId: "player01",
    armdozer: { ...EMPTY_ARMDOZER_STATE,
      battery: 0,
      maxBattery: 5,
      enableBurst: true,
      burst: {
        type: "RecoverBattery",
        recoverBattery: 5
      }
    }
  };
  const otherPlayer: PlayerState = { ...EMPTY_PLAYER_STATE,
    playerId: "player02"
  };
  const lastState: GameState = { ...EMPTY_GAME_STATE,
    players: [otherPlayer, burstPlayer]
  };
  const result = burst(lastState, burstPlayer.playerId);
  const snapShotPath = path.join(__dirname, "recover-battery.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});