import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { BurstEffect } from "./burst-effect";
import { disableInvokerBurst } from "./disable-invoker-burst";
import { invokeBurst } from "./invoke-burst";

/**
 * バーストを実行する
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト結果、実行不可能な場合はnullを返す
 */
export function burst(
  lastState: GameState,
  burstPlayerId: PlayerId,
): GameStateX<BurstEffect> {
  const invoker = lastState.players.find((v) => v.playerId === burstPlayerId);
  const other = lastState.players.find((v) => v.playerId !== burstPlayerId);
  if (!invoker || !other) {
    throw new Error("invalid burst player id");
  }

  const burst = invoker.armdozer.burst;
  const result = invokeBurst({ burst, invoker, other });
  const updatedInvoker = disableInvokerBurst(result.invoker);
  const updatedOther = result.other;
  const players = lastState.players.map((v) =>
    v.playerId === burstPlayerId ? updatedInvoker : updatedOther,
  );
  return {
    ...lastState,
    players,
    effect: {
      name: "BurstEffect",
      burstPlayer: burstPlayerId,
      burst,
    },
  };
}
