import type { GameState, GameStateX } from "../../state/game-state";
import {
  isRemainArmdozerEffect,
  updateArmdozerEffect,
} from "./armdozer-effect";
import type {
  EndArmdozerEffect,
  UpdateRemainingTurn,
} from "./update-remaining-turn";

/**
 * 効果継続ターン数を更新する
 *
 * @param lastState 最新状態
 * @return 更新結果
 */
export function updateRemainingTurn(
  lastState: GameState
): GameStateX<UpdateRemainingTurn> {
  const updatePlayers = lastState.players.map((v) => ({
    ...v,
    armdozer: {
      ...v.armdozer,
      effects: v.armdozer.effects
        .map((v) => updateArmdozerEffect(v))
        .filter((v) => isRemainArmdozerEffect(v)),
    },
  }));
  const endArmdozerEffect: EndArmdozerEffect[] = lastState.players
    .map((player) =>
      player.armdozer.effects
        .map((effect) => updateArmdozerEffect(effect))
        .filter((effect) => !isRemainArmdozerEffect(effect))
        .map((effect) => ({
          playerId: player.playerId,
          effect: effect,
        }))
    )
    .reduce((a, b) => a.concat(b));
  return {
    ...lastState,
    players: updatePlayers,
    effect: {
      name: "UpdateRemainingTurn",
      endArmdozerEffects: endArmdozerEffect,
    },
  };
}
