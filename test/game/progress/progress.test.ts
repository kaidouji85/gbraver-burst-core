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
import { progress } from "../../../src/game/progress";

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

test("戦闘フローを正しく進めることができる", () => {
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    {
      playerId: ATTACKER.playerId,
      command: BATTERY_COMMAND,
    },
    {
      playerId: DEFENDER.playerId,
      command: BATTERY_COMMAND,
    },
  ];
  const result = progress(state, commands);
  expect(result).toMatchSnapshot("battle-flow");
});

test("効果適用フローを正しく進めることができる", () => {
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
  const result = progress(state, commands);
  expect(result).toMatchSnapshot("effect-activation-flow");
});
