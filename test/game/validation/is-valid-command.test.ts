import { BatteryCommand } from "../../../src/command/battery";
import { BurstCommand } from "../../../src/command/burst";
import { PilotSkillCommand } from "../../../src/command/pilot-skill";
import {
  InputCommand,
  NoChoice,
  Selectable,
} from "../../../src/effect/input-command/input-command";
import { PlayerCommand } from "../../../src/game/command/player-command";
import { isValidCommand } from "../../../src/game/validation/is-valid-command";

/**
 * バッテリーコマンドを生成する
 * @param value バッテリー値
 * @returns バッテリーコマンド
 */
const batteryCommand = (value: number): BatteryCommand => ({
  type: "BATTERY_COMMAND",
  battery: value,
});

/** バーストコマンド */
const burstCommand: BurstCommand = {
  type: "BURST_COMMAND",
};

/** Selectableテストデータ */
const testSelectable: Selectable = {
  playerId: "selectable-player",
  selectable: true,
  command: [
    batteryCommand(0),
    batteryCommand(1),
    batteryCommand(2),
    batteryCommand(3),
    burstCommand,
  ],
};

/** NoChoiceテストデータ */
const testNoChoice: NoChoice = {
  playerId: "no-choice-player",
  selectable: false,
  nextTurnCommand: batteryCommand(4),
};

/** InputCommandテストデータ */
const testInputCommand: InputCommand = {
  name: "InputCommand",
  players: [testSelectable, testNoChoice],
};

/** パイロットスキルコマンド */
const pilotSkillCommand: PilotSkillCommand = {
  type: "PILOT_SKILL_COMMAND",
};

test("Selectableに含まれているコマンドなら有効である", () => {
  const playerCommand: PlayerCommand = {
    playerId: testSelectable.playerId,
    command: batteryCommand(3),
  };
  expect(isValidCommand(playerCommand, testInputCommand)).toBe(true);
});

test("Selectableに含まれていないコマンドなら無効である", () => {
  const playerCommand: PlayerCommand = {
    playerId: testSelectable.playerId,
    command: pilotSkillCommand,
  };
  expect(isValidCommand(playerCommand, testInputCommand)).toBe(false);
});

test("NoChoiceのコマンドなら有効である", () => {
  const playerCommand: PlayerCommand = {
    playerId: testNoChoice.playerId,
    command: batteryCommand(4),
  };
  expect(isValidCommand(playerCommand, testInputCommand)).toBe(true);
});

test("NoChoiceのコマンドでないので無効である", () => {
  const playerCommand: PlayerCommand = {
    playerId: testNoChoice.playerId,
    command: batteryCommand(3),
  };
  expect(isValidCommand(playerCommand, testInputCommand)).toBe(false);
});

test("存在しないプレイヤーIDなので無効である", () => {
  const playerCommand: PlayerCommand = {
    playerId: "no-exist-player",
    command: batteryCommand(3),
  };
  expect(isValidCommand(playerCommand, testInputCommand)).toBe(false);
});
