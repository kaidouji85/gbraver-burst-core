import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { disableInvokerPilotSkill } from "./disable-invoker-pilot-skill";
import { invokePilotSkill } from "./invoke-pilot-skill";
import { PilotSkillEffect } from "./pilot-skill-effect";

/**
 * パイロットスキルを発動する
 * @param lastState 最新の状態
 * @param invokerId パイロットスキルを発動するプレイヤー
 * @return 更新結果、実行不可能な場合は例外を返す
 */
export function pilotSkill(
  lastState: GameState,
  invokerId: PlayerId,
): GameStateX<PilotSkillEffect> {
  const invoker = lastState.players.find((v) => v.playerId === invokerId);
  const other = lastState.players.find((v) => v.playerId !== invokerId);
  if (!invoker || !other) {
    throw new Error("invalid pilot skill player id");
  }

  const skill = invoker.pilot.skill;
  const result = invokePilotSkill({ skill, invoker, other });
  const updatedInvoker = disableInvokerPilotSkill(result.invoker);
  const updatedOther = result.other;
  const players = lastState.players.map((v) =>
    v.playerId === invokerId ? updatedInvoker : updatedOther,
  );
  return {
    ...lastState,
    players,
    effect: {
      name: "PilotSkillEffect",
      invokerId,
      skill,
    },
  };
}
