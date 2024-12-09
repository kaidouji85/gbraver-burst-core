import {
  ArmdozerEffect,
  Burst,
  BurstCommand,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  PilotSkill,
  PilotSkillCommand,
  PlayerCommandX,
  PlayerState,
} from "../../../../src";
import { playerEffectActivationFlow } from "../../../../src/game/progress/effect-activation-flow/player-effect-activation-flow";

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

/** バーストコマンド */
const BURST_COMMAND: PlayerCommandX<BurstCommand> = {
  playerId: burstPlayerId,
  command: { type: "BURST_COMMAND" },
};

/** パイロットスキルコマンド */
const PILOT_SKILL_COMMAND: PlayerCommandX<PilotSkillCommand> = {
  playerId: burstPlayerId,
  command: { type: "PILOT_SKILL_COMMAND" },
};

test("バーストが正しく発動される", () => {
  const burstPlayer = createBurstPlayer({
    burst: {
      type: "RecoverBattery",
      recoverBattery: 3,
      turnStartBatteryCorrect: 1,
    },
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: otherPlayer.playerId,
    players: [otherPlayer, burstPlayer],
  };
  const result = playerEffectActivationFlow(lastState, BURST_COMMAND);
  expect(result).toMatchSnapshot();
});

test("パイロットスキルが正しく発動される", () => {
  const burstPlayer = createBurstPlayer({
    pilotSkill: {
      type: "RecoverBatterySkill",
      recoverBattery: 2,
    },
  });
  const lastState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: otherPlayer.playerId,
    players: [otherPlayer, burstPlayer],
  };
  const result = playerEffectActivationFlow(lastState, PILOT_SKILL_COMMAND);
  expect(result).toMatchSnapshot();
});

test("強制ターン終了を発動した場合、バースト効果、UpdateRemainingTurn、InputCommandが実行される", () => {
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
  const result = playerEffectActivationFlow(lastState, BURST_COMMAND);
  expect(result).toMatchSnapshot();
});
