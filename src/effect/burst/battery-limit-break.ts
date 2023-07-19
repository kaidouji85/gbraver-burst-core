import type { BatteryLimitBreak } from "../../player/burst";
import type { PlayerId } from "../../player/player";
import type { ArmdozerState } from "../../state/armdozer-state";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import type { BurstEffect } from "./burst-effect";
import { burstRecoverBattery } from "./burst-recover-battery";

/**
 * バッテリーリミットブレイクを適用する
 * @param invoker バースト発動者
 * @param burst バースト内容
 * @return 発動後のステート
 */
function invokeBatteryLimitBreak(
  invoker: PlayerState,
  burst: BatteryLimitBreak,
) {
  const updatedArmdozer: ArmdozerState = {
    ...invoker.armdozer,
    maxBattery: burst.maxBattery,
  };
  return {
    ...invoker,
    armdozer: {
      ...updatedArmdozer,
      battery: burstRecoverBattery(updatedArmdozer, burst),
    },
  };
}

/**
 * バッテリーリミットブレイク
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト効果
 * @return 更新結果、実行不可能な場合は例外を投げる
 */
export function batteryLimitBreak(
  lastState: GameState,
  burstPlayerId: PlayerId,
  burst: BatteryLimitBreak,
): GameStateX<BurstEffect> {
  const players = lastState.players.map((player) =>
    player.playerId === burstPlayerId
      ? invokeBatteryLimitBreak(player, burst)
      : player,
  );
  const effect: BurstEffect = {
    name: "BurstEffect",
    burstPlayer: burstPlayerId,
    burst,
  };
  return { ...lastState, players, effect };
}
