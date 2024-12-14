import {
  BatteryCommand,
  BurstCommand,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  GameState,
  PilotSkillCommand,
  PlayerCommand,
  PlayerState,
} from "../../../../src";
import { activateEffectOrNot } from "../../../../src/game/progress/effect-activation-flow/activate-effect-or-not";

/** バーストコマンド */
const BURST_COMMAND: BurstCommand = {
  type: "BURST_COMMAND",
};

/** バッテリーコマンド */
const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 2,
};

/** パイロットスキルコマンド */
const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

/** バースト発動プレイヤー */
const TEST_PLAYER: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "test" };

/** それ以外のプレイヤー */
const OTHER_PLAYER: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "other" };

test("バッテリーコマンドの場合は何もしない", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER],
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command: BATTERY_COMMAND,
  };
  const result = activateEffectOrNot(state, command);
  expect(result).toBeNull();
});

test("バーストコマンドの場合は、バーストを発動する", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER],
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command: BURST_COMMAND,
  };
  const result = activateEffectOrNot(state, command);
  expect(result && result.effect.name === "BurstEffect").toBe(true);
});

test("パイロットスキルコマンドの場合は、パイロットスキルを発動する", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [OTHER_PLAYER, TEST_PLAYER],
  };
  const command: PlayerCommand = {
    playerId: TEST_PLAYER.playerId,
    command: PILOT_SKILL_COMMAND,
  };
  const result = activateEffectOrNot(state, command);
  expect(result && result.effect.name === "PilotSkillEffect").toBe(true);
});
