import { inputCommand } from "../../../effect/input-command";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";

/** プレイヤー単体の効果発動フローの実行結果 */
type PlayerEffectActivationFlowResult = {
  /** 更新されたステート */
  history: GameState[];
  /** 強制ターンエンドが発動したか、trueで発動した */
  hasForceTurnEnd: boolean;
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
    return { history: [], hasForceTurnEnd: false };
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
      history: [done, ...postForceTurnEnd],
      hasForceTurnEnd: true,
    };
  }

  return { history: [done], hasForceTurnEnd: false };
}
