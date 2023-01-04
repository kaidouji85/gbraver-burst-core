import path from "path";
import type { BatteryCommand, BurstCommand, GameState, PlayerState } from "../../../src";
import type { PilotSkillCommand } from "../../../src/command/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { progress } from "../../../src/game/progress";
import { exportSnapShotJSON, importSnapShotJSON, shouldUpdateSnapShot } from "../../snap-shot";
const ATTACKER: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "attacker"
};
const DEFENDER: PlayerState = { ...EMPTY_PLAYER_STATE,
  playerId: "defender"
};
const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1
};
const BURST_COMMAND: BurstCommand = {
  type: "BURST_COMMAND"
};
const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND"
};
test("戦闘フローを正しく進めることができる", () => {
  const state: GameState = { ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId
  };
  const commands = [{
    playerId: ATTACKER.playerId,
    command: BATTERY_COMMAND
  }, {
    playerId: DEFENDER.playerId,
    command: BATTERY_COMMAND
  }];
  const result = progress(state, commands);
  const snapShotPath = path.join(__dirname, "progress__battle-flow.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});
test("効果適用フローを正しく進めることができる", () => {
  const state: GameState = { ...EMPTY_GAME_STATE,
    players: [DEFENDER, ATTACKER],
    activePlayerId: ATTACKER.playerId
  };
  const commands = [{
    playerId: ATTACKER.playerId,
    command: BURST_COMMAND
  }, {
    playerId: DEFENDER.playerId,
    command: PILOT_SKILL_COMMAND
  }];
  const result = progress(state, commands);
  const snapShotPath = path.join(__dirname, "progress__effect-activation-flow.json");
  shouldUpdateSnapShot() && exportSnapShotJSON(snapShotPath, result);
  const snapShot = shouldUpdateSnapShot() ? result : importSnapShotJSON(snapShotPath);
  expect(result).toEqual(snapShot);
});