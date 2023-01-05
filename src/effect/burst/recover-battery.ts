import type { RecoverBattery } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バースト バッテリー回復
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function recoverBattery(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: RecoverBattery
): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(
    (v) => v.playerId === burstPlayerId
  );

  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
    },
  };
  const updatedPlayers = lastState.players.map((player) =>
    player.playerId === burstPlayerId ? updatedBurstPlayer : player
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players: updatedPlayers, effect };
}