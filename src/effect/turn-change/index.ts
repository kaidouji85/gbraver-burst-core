import type { GameState, GameStateX } from "../../state/game-state";
import { removeBatteryRecoverSkip } from "../remove-battery-recover-skip";
import { calcTurnChangeRecoverBattery } from "./recover-battery";
import type { TurnChange } from "./turn-change";

/**
 * ターンチェンジを実行する
 * @param lastState 更新前のゲームステート
 * @return 実行結果、実行不可能な場合はnullを返す
 */
export function turnChange(lastState: GameState): GameStateX<TurnChange> {
  const nextActivePlayer = lastState.players.find(
    (v) => v.playerId !== lastState.activePlayerId,
  );

  if (!nextActivePlayer) {
    throw new Error("not found next active player");
  }

  const { recoverBattery, battery } = calcTurnChangeRecoverBattery(nextActivePlayer);
  const updatedPlayer = {
    ...nextActivePlayer,
    armdozer: {
      ...nextActivePlayer.armdozer,
      battery,
      effects: removeBatteryRecoverSkip(nextActivePlayer.armdozer.effects),
    },
  };
  const updatedPlayerList = lastState.players.map((v) =>
    v.playerId === updatedPlayer.playerId ? updatedPlayer : v,
  );
  return {
    ...lastState,
    activePlayerId: updatedPlayer.playerId,
    players: updatedPlayerList,
    effect: {
      name: "TurnChange",
      recoverBattery,
    },
  };
}
