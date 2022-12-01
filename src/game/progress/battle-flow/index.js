// @flow
import type { BatteryCommand } from "../../../command/battery";
import type { Battle } from "../../../effect/battle/battle";
import { gameEnd } from "../../../effect/game-end";
import { canRightItself, rightItself } from "../../../effect/right-itself";
import type { GameState } from "../../../state/game-state";
import { upcastGameState } from "../../../state/game-state";
import type { PlayerCommandX } from "../../command/player-command";
import { gameEndJudging } from "../../end-judging";
import { startGameStateFlow } from "../../game-state-flow";
import { attackFlow } from "./attack-flow";
import { gameContinueFlow } from "./game-continue-flow";
import { canReflectFlow, reflectFlow } from "./reflect-flow";

/**
 * 戦闘フロー
 *
 * @param lastState 最後の状態
 * @param commands コマンド
 * @return 更新されたゲームステート
 */
export function battleFlow(
  lastState: GameState,
  commands: [PlayerCommandX<BatteryCommand>, PlayerCommandX<BatteryCommand>]
): GameState[] {
  const attacker = commands.find(
    (v) => v.playerId === lastState.activePlayerId
  );
  const defender = commands.find(
    (v) => v.playerId !== lastState.activePlayerId
  );
  if (!attacker || !defender) {
    throw new Error("not found attacker or defender command");
  }

  return startGameStateFlow(attackFlow(lastState, attacker, defender))
    .add((state) => {
      const battleEffect =
        state.effect.name === "Battle" ? (state.effect: Battle) : null;
      return battleEffect
        ? startGameStateFlow([state])
            .add((state) =>
              canReflectFlow(battleEffect.result)
                ? reflectFlow(state, attacker.playerId)
                : []
            )
            .add((state) =>
              canRightItself(battleEffect)
                ? [upcastGameState(rightItself(state, battleEffect))]
                : []
            )
            .toGameStateHistory()
            .slice(1)
        : [];
    })
    .add((state) => {
      const endJudge = gameEndJudging(state);
      return endJudge.type === "GameContinue"
        ? gameContinueFlow(
            state,
            attacker.playerId,
            attacker.command,
            defender.playerId,
            defender.command
          )
        : [upcastGameState(gameEnd(state, endJudge))];
    })
    .toGameStateHistory();
}
