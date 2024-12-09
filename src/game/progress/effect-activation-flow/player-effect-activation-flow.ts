import { inputCommand } from "../../../effect/input-command";
import { updateRemainingTurn } from "../../../effect/update-remaining-turn";
import { GameState } from "../../../state/game-state";
import { PlayerCommand } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";
import { activateEffectOrNot } from "./activate-effect-or-not";

/**
 * プレイヤー単体の効果発動フローを実行する
 * @param lastState 最後のゲームステート
 * @param command プレイヤーが出したコマンド
 * @returns 更新されたゲームの状態
 */
export function playerEffectActivationFlow(
  lastState: GameState,
  command: PlayerCommand,
): GameState[] {
  const done = activateEffectOrNot(lastState, command);
  if (!done) {
    return [];
  }

  const isForceTurnEndActivated =
    done.effect.name === "BurstEffect" &&
    done.effect.burst.type === "ForceTurnEnd";
  if (isForceTurnEndActivated) {
    return [
      done,
      ...startGameFlow(done, [
        (state) => [updateRemainingTurn(state)],
        (state) => [inputCommand({ lastState: state, noChoices: [] })],
      ]),
    ];
  }

  return [done];
}
