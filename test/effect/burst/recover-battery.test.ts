import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { GameState } from "../../../src/state/game-state";
import { PlayerState } from "../../../src/state/player-state";

/** バースト発動者 */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "player01",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 0,
    maxBattery: 5,
    enableBurst: true,
    burst: {
      type: "RecoverBattery",
      recoverBattery: 5,
      turnStartBatteryCorrect: 1,
    },
  },
};

/** それ以外のプレイヤー */
const otherPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "player02",
};

/** ゲームステート */
const lastState: GameState = {
  ...EMPTY_GAME_STATE,
  activePlayerId: otherPlayer.playerId,
  players: [otherPlayer, burstPlayer],
};

test("バースト効果バッテリー回復が正しく適用される", () => {
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
