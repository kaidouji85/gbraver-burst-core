import { BatteryCommand } from "../../../src/command/battery";
import { BurstCommand } from "../../../src/command/burst";
import { PilotSkillCommand } from "../../../src/command/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { PlayerCommand } from "../../../src/game/command/player-command";
import { progress } from "../../../src/game/progress";
import { GameState } from "../../../src/state/game-state";
import { PlayerState } from "../../../src/state/player-state";

/** 攻撃側プレイヤー */
const attacker: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };

/** 防御側プレイヤー */
const defender: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "defender" };

/** バッテリーコマンド */
const batteryCommand: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};

/** バーストコマンド */
const burstCommand: BurstCommand = {
  type: "BURST_COMMAND",
};

/** パイロットスキルコマンド */
const pilotSkillCommand: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test("両方のプレイヤーがバッテリーコマンドを出した場合は戦闘フローを進める", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: batteryCommand },
    { playerId: defender.playerId, command: batteryCommand },
  ];
  const result = progress(state, commands);
  expect(result).toMatchSnapshot("battle-flow");
});

test("それ以外の場合は効果適用フローを進める", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: burstCommand },
    { playerId: defender.playerId, command: pilotSkillCommand },
  ];
  const result = progress(state, commands);
  expect(result).toMatchSnapshot("effect-activation-flow");
});
