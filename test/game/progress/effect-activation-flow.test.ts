import type {
  BatteryCommand,
  BurstCommand,
  GameState,
  PlayerCommand,
  PlayerState,
} from "../../../src";
import type { PilotSkillCommand } from "../../../src/command/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { effectActivationFlow } from "../../../src/game/progress/effect-activation-flow";

const ATTACKER: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };
const DEFENDER: PlayerState = { ...EMPTY_PLAYER_STATE, playerId: "defender" };
const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};
const BURST_COMMAND: BurstCommand = {
  type: "BURST_COMMAND",
};
const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test("一人だけ効果適用する場合でも正しく処理される", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    {
      playerId: ATTACKER.playerId,
      command: BURST_COMMAND,
    },
    {
      playerId: DEFENDER.playerId,
      command: BATTERY_COMMAND,
    },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot("one-player-effective");
});

test("二人とも効果適用する場合でも正しく処理される", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    {
      playerId: ATTACKER.playerId,
      command: BURST_COMMAND,
    },
    {
      playerId: DEFENDER.playerId,
      command: PILOT_SKILL_COMMAND,
    },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot("two-player-effective");
});
