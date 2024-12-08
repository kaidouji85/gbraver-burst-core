import { EMPTY_GAME_STATE, GameState, PlayerState } from "../../../src";
import { burst } from "../../../src/effect/burst";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

/** バースト発動プレイヤー */
const burstPlayer: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "burstPlayer",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery: 2,
    maxBattery: 4,
    burst: {
      type: "BatteryLimitBreak",
      recoverBattery: 8,
      maxBattery: 8,
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
  activePlayerId: otherPlayer.playerId,
  players: [otherPlayer, burstPlayer],
};

test("バッテリーリミットブレイクが正しく適用できる", () => {
  const result = burst(lastState, burstPlayer.playerId);
  expect(result).toMatchSnapshot();
});
