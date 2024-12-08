import {
  BatteryCommand,
  Burst,
  BurstCommand,
  ForceTurnEnd,
  GameState,
  PlayerCommand,
  PlayerId,
  PlayerState,
} from "../../../src";
import { PilotSkillCommand } from "../../../src/command/pilot-skill";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";
import { effectActivationFlow } from "../../../src/game/progress/effect-activation-flow";

/**
 * テストプレイヤーを生成うる
 * @param playerId プレイヤーID
 * @param burst バースト
 */
const createPlayer = (
  playerId: PlayerId,
  burst: Burst = {
    type: "RecoverBattery",
    recoverBattery: 5,
    turnStartBatteryCorrect: 1,
  },
): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId,
  armdozer: {
    ...EMPTY_PLAYER_STATE.armdozer,
    burst,
  },
});

/** 強制ターン終了 */
const FORCE_TURN_END: ForceTurnEnd = {
  type: "ForceTurnEnd",
  recoverBattery: 2,
};

/** バッテリーコマンド */
const BATTERY_COMMAND: BatteryCommand = {
  type: "BATTERY_COMMAND",
  battery: 1,
};

/** バーストコマンド */
const BURST_COMMAND: BurstCommand = {
  type: "BURST_COMMAND",
};

/** パイロットスキルコマンド */
const PILOT_SKILL_COMMAND: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test("攻撃側だけが効果発動した場合、防御側は何もせずにフローが進む", () => {
  const attacker = createPlayer("attacker");
  const defender = createPlayer("defender");
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: BURST_COMMAND },
    { playerId: defender.playerId, command: BATTERY_COMMAND },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot();
});

test("防御側だけが効果発動した場合、攻撃側はなにもせずにフローが進む", () => {
  const attacker = createPlayer("attacker");
  const defender = createPlayer("defender");
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: BATTERY_COMMAND },
    { playerId: defender.playerId, command: PILOT_SKILL_COMMAND },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot();
});

test("攻撃側、防御側の両方で効果を発動した場合、両方の効果を発動してフローが進む", () => {
  const attacker = createPlayer("attacker");
  const defender = createPlayer("defender");
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: BURST_COMMAND },
    { playerId: defender.playerId, command: PILOT_SKILL_COMMAND },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot();
});

test("攻撃側が強制ターン終了を発動した場合、防御側の効果は発動されない", () => {
  const attacker = createPlayer("attacker", FORCE_TURN_END);
  const defender = createPlayer("defender");
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: BURST_COMMAND },
    { playerId: defender.playerId, command: PILOT_SKILL_COMMAND },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot();
});

test("防御側が強制ターン終了を発動した場合、攻撃側の効果は発動されるが攻撃プレイヤーが交換される", () => {
  const attacker = createPlayer("attacker");
  const defender = createPlayer("defender", FORCE_TURN_END);
  const state: GameState = {
    ...EMPTY_GAME_STATE,
    players: [defender, attacker],
    activePlayerId: attacker.playerId,
  };
  const commands: [PlayerCommand, PlayerCommand] = [
    { playerId: attacker.playerId, command: BURST_COMMAND },
    { playerId: defender.playerId, command: BURST_COMMAND },
  ];
  const result = effectActivationFlow(state, commands);
  expect(result).toMatchSnapshot();
});