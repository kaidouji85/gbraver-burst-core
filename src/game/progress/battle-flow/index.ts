import { BatteryCommand } from "../../../command/battery";
import { batteryDeclaration } from "../../../effect/battery-declaration";
import { battle } from "../../../effect/battle";
import { gameEnd } from "../../../effect/game-end";
import { canRightItself, rightItself } from "../../../effect/right-itself";
import { GameState } from "../../../state/game-state";
import { PlayerCommandX } from "../../command/player-command";
import { gameEndJudging } from "../../end-judging";
import { startGameFlow } from "../../game-flow";
import { gameContinueFlow } from "./game-continue-flow";
import { reflectFlow } from "./reflect-flow";
import { canReflectFlow } from "./can-reflect-flow";

/**
 * 戦闘フロー
 * @param lastState 最後の状態
 * @param commands コマンド
 * @returns 更新されたゲームステート
 */
export function battleFlow(
  lastState: GameState,
  commands: [PlayerCommandX<BatteryCommand>, PlayerCommandX<BatteryCommand>],
): GameState[] {
  const { activePlayerId } = lastState;
  const attackerCommand = commands.find((v) => v.playerId === activePlayerId);
  const defenderCommand = commands.find((v) => v.playerId !== activePlayerId);
  if (!attackerCommand || !defenderCommand) {
    throw new Error("not found attacker or defender command");
  }

  return startGameFlow(lastState, [
    (state) => {
      const doneBatteryDeclaration = batteryDeclaration({
        lastState: state,
        attackerCommand,
        defenderCommand,
      });
      const doneBattle = battle({
        ...doneBatteryDeclaration.effect,
        lastState: doneBatteryDeclaration,
        attackerId: attackerCommand.playerId,
        defenderId: defenderCommand.playerId,
      });
      return [
        doneBatteryDeclaration,
        doneBattle,
        ...startGameFlow(doneBattle, [
          (state) =>
            canReflectFlow(doneBattle)
              ? reflectFlow(state, attackerCommand.playerId)
              : [],
          (state) =>
            canRightItself(doneBattle.effect)
              ? [rightItself(state, doneBattle.effect)]
              : [],
        ]),
      ];
    },
    (state) => {
      const endJudge = gameEndJudging(state);
      return endJudge.type === "GameContinue"
        ? gameContinueFlow(state)
        : [gameEnd(state, endJudge)];
    },
  ]);
}
