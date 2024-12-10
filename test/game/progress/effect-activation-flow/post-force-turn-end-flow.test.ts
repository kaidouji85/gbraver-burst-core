import {
  ArmdozerEffect,
  Burst,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  PilotSkill,
  PlayerState,
} from "../../../../src";
import { postForceTurnEndFlow } from "../../../../src/game/progress/effect-activation-flow/post-force-turn-end-flow";

/** バースト発動プレイヤーID */
const burstPlayerId = "burstPlayer";

/**
 * バースト発動プレイヤーを生成する
 * @param options 生成オプション
 * @param options.burst バースト
 * @param options.pilotSkill パイロットスキル
 * @param options.effects 適用中の効果
 * @returns バースト発動プレイヤー
 */
const createBurstPlayer = (options: {
  burst?: Burst;
  pilotSkill?: PilotSkill;
  effects?: ArmdozerEffect[];
}): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: burstPlayerId,
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    burst: options.burst ?? EMPTY_PLAYER_STATE.armdozer.burst,
    effects: options.effects ?? [],
    battery: 1,
    maxBattery: 5,
  },
  pilot: {
    ...EMPTY_PLAYER_STATE.pilot,
    skill: options.pilotSkill ?? EMPTY_PLAYER_STATE.pilot.skill,
  },
});

/** それ以外のプレイヤー */
const otherPlayer = {
  ...EMPTY_PLAYER_STATE,
  playerId: "otherPlayer",
};

test("強制ターンエンド発動後のフローが正しく実行される", () => {
  const burstPlayer = createBurstPlayer({
    burst: {
      type: "ForceTurnEnd",
      recoverBattery: 2,
    },
    effects: [
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
    ],
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: otherPlayer.playerId,
    players: [otherPlayer, burstPlayer],
  };
  const result = postForceTurnEndFlow(lastState);
  expect(result).toMatchSnapshot();
});
