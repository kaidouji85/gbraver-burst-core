import type { BatteryLimitBreak } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { ArmdozerState } from "../../state/armdozer-state";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バッテリーリミットブレイク
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function batteryLimitBreak(lastState: GameState, burstPlayerId: PlayerId, burst: BatteryLimitBreak): GameStateX<BurstEffect> {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);

  if (!burstPlayer) {
    throw new Error("not found burst player");
  }

  const updatedArmdozer: ArmdozerState = { ...burstPlayer.armdozer,
    maxBattery: burst.maxBattery
  };
  const updatedBurstPlayer: PlayerState = { ...burstPlayer,
    armdozer: { ...updatedArmdozer,
      battery: burstRecoverBattery(updatedArmdozer, burst)
    }
  };
  const updatedPlayers = lastState.players.map(player => player.playerId === updatedBurstPlayer.playerId ? updatedBurstPlayer : player);
  const effect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst
  };
  return { ...lastState,
    players: updatedPlayers,
    effect
  };
}