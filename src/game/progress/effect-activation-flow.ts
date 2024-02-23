import { burst } from "../../effect/burst";
import { inputCommand } from "../../effect/input-command";
import { pilotSkill } from "../../effect/pilot-skill";
import type { GameState } from "../../state/game-state";
import type { PlayerCommand } from "../command/player-command";
import { startGameFlow } from "../game-flow";

/**
 * 効果発動フローを行うか否かを判定する
 * @param commands プレイヤーが選択したコマンド
 * @return 判定結果、trueでバーストフェイズを行う
 */
export function isEffectActivationFlow(
  commands: [PlayerCommand, PlayerCommand],
): boolean {
  const types = commands.map((v) => v.command.type);
  return (
    types.includes("BURST_COMMAND") || types.includes("PILOT_SKILL_COMMAND")
  );
}

/**
 * コマンドに応じて 効果発動 or 何もしない
 * 何もしない場合はnullを返す
 * @param state 最新のゲームステート
 * @param command コマンド
 * @return 更新結果
 */
export function activationOrNot(
  state: GameState,
  command: PlayerCommand,
): GameState | null {
  if (command.command.type === "BURST_COMMAND") {
    return burst(state, command.playerId);
  }

  if (command.command.type === "PILOT_SKILL_COMMAND") {
    return pilotSkill(state, command.playerId);
  }

  return null;
}

/**
 * 効果発動フロー
 * 現状ではバースト、パイロットスキルを想定している
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームの状態
 */
export function effectActivationFlow(
  lastState: GameState,
  commands: [PlayerCommand, PlayerCommand],
): GameState[] {
  const attackerCommand = commands.find(
    (v) => v.playerId === lastState.activePlayerId,
  );
  const defenderCommand = commands.find(
    (v) => v.playerId !== lastState.activePlayerId,
  );
  if (!attackerCommand || !defenderCommand) {
    throw new Error("not found attacker or defender command");
  }

  return startGameFlow(
    [
      (state) => {
        const done = activationOrNot(state, attackerCommand);
        return done ? [done] : [];
      },
      (state) => {
        const done = activationOrNot(state, defenderCommand);
        return done ? [done] : [];
      },
      (state) => [
        inputCommand(
          state,
          attackerCommand.playerId,
          attackerCommand.command,
          defenderCommand.playerId,
          defenderCommand.command,
        ),
      ],
    ],
    lastState,
  );
}
