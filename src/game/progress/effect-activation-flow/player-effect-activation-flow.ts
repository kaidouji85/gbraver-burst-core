import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";
import { inputCommand } from "../../../effect/input-command";

/** プレイヤー単体の効果発動フローの実行結果 */
type PlayerEffectActivationFlowResult = {
  /** 更新されたステート */
  stateHistory: GameState[];
  /** 次プレイヤーの効果発動をスキップするか、trueでスキップする */
  shouldNextEffectActivationSkip: boolean;
};

/**
 * プレイヤー単体の効果発動フローを実行する
 * @param lastState 最後のゲームステート
 * @param command プレイヤーが出したコマンド
 * @returns 実行結果
 */
export function playerEffectActivationFlow(
  lastState: GameState,
  command: PlayerCommand,
): PlayerEffectActivationFlowResult {
  const done = activateEffectOrNot(lastState, command);
  if (!done) {
    return { stateHistory: [], shouldNextEffectActivationSkip: false };
  }

  const isForceTurnEndActivated =
    done.effect.name === "BurstEffect" &&
    done.effect.burst.type === "ForceTurnEnd";
  if (isForceTurnEndActivated) {
    const postForceTurnEnd = startGameFlow(done, [
      (state) => [updateRemainingTurn(state)],
      (state) => [inputCommand({ lastState: state, noChoices: [] })],
    ]);
    return {
      stateHistory: [done, ...postForceTurnEnd],
      shouldNextEffectActivationSkip: true,
    };
  }

  return { stateHistory: [done], shouldNextEffectActivationSkip: false };
}
