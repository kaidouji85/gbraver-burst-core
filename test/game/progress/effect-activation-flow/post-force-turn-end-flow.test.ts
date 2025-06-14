import { PlayerState } from "../../../../src";
import { EMPTY_GAME_STATE } from "../../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { postForceTurnEndFlow } from "../../../../src/game/progress/effect-activation-flow/post-force-turn-end-flow";
import { ArmdozerEffect } from "../../../../src/state/armdozer-effect";

/** バースト発動プレイヤーID */
const burstPlayerId = "burstPlayer";

/**
 * バースト発動プレイヤーを生成する
 * @param effects 適用中の効果
 * @returns バースト発動プレイヤー
 */
const createBurstPlayer = (effects?: ArmdozerEffect[]): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: burstPlayerId,
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    effects: effects ?? [],
    battery: 1,
    maxBattery: 5,
  },
});

/** それ以外のプレイヤー */
const otherPlayer = {
  ...EMPTY_PLAYER_STATE,
  playerId: "otherPlayer",
};

test("強制ターンエンド発動後には、UpdateRemainingTurn、InputCommandが実行される", () => {
  const burstPlayer = createBurstPlayer([
    {
      type: "HalveCorrectPower",
      period: {
        type: "TurnLimit",
        remainingTurn: 2,
      },
    },
    {
      type: "TryReflect",
      damage: 2000,
      effect: "Lightning",
      period: {
        type: "TurnLimit",
        remainingTurn: 1,
      },
    },
  ]);
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: burstPlayer.playerId,
    players: [otherPlayer, burstPlayer],
  };
  const result = postForceTurnEndFlow(lastState);
  expect(result).toMatchSnapshot();
});
