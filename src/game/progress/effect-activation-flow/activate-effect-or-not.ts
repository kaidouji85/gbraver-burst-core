import { burst } from "../../../effect/burst";
import { pilotSkill } from "../../../effect/pilot-skill";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";

/**
 * コマンドに応じて 効果発動 or 何もしない
 * 何もしない場合はnullを返す
 * @param state 最新のゲームステート
 * @param command コマンド
 * @returns 更新結果
 */
export function activateEffectOrNot(
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
