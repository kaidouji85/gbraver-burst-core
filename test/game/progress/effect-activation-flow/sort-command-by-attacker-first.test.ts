import { PlayerState } from "../../../../src";
import { EMPTY_PLAYER_STATE } from "../../../../src/empty/player";
import { PlayerCommand } from "../../../../src/game/command/player-command";
import { sortCommandByAttackerFirst } from "../../../../src/game/progress/effect-activation-flow/sort-command-by-attacker-first";

/** 攻撃側プレイヤー */
const attacker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
};

/** 攻撃側コマンド */
const attackerCommand: PlayerCommand = {
  playerId: attacker.playerId,
  command: { type: "BURST_COMMAND" },
};

/** 防御側プレイヤー */
const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
};

/** 防御側コマンド */
const defenderCommand: PlayerCommand = {
  playerId: defender.playerId,
  command: { type: "PILOT_SKILL_COMMAND" },
};

test("攻撃側が先頭になるようにソートさせる", () => {
  expect(
    sortCommandByAttackerFirst([defenderCommand, attackerCommand], {
      activePlayerId: attacker.playerId,
    }),
  ).toEqual([attackerCommand, defenderCommand]);
});

test("あらかじめ攻撃側が先頭なら、結果としてなにもしない", () => {
  expect(
    sortCommandByAttackerFirst([attackerCommand, defenderCommand], {
      activePlayerId: attacker.playerId,
    }),
  ).toEqual([attackerCommand, defenderCommand]);
});

test("攻撃側コマンドが見つからない場合は例外を投げる", () => {
  expect(() =>
    sortCommandByAttackerFirst([attackerCommand, defenderCommand], {
      activePlayerId: "no-exist",
    }),
  ).toThrow();
});
