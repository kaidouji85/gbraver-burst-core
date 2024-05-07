import { GameState, GameStateX } from "../../state/game-state";
import { PlayerState } from "../../state/player-state";
import { removeBatteryRecoverSkip } from "../remove-battery-recover-skip";
import { calcRecoverBattery } from "./recover-battery";
import { TurnChange } from "./turn-change";

/**
 * 次のアクティブプレイヤーステートを更新する
 * @param player プレイヤーステート
 * @param battery 回復後のバッテリー
 * @returns 更新結果
 */
const updateNextActivePlayer = (
  player: PlayerState,
  battery: number,
): PlayerState => ({
  ...player,
  armdozer: {
    ...player.armdozer,
    battery,
    effects: removeBatteryRecoverSkip(player.armdozer.effects),
  },
});

/**
 * ターンチェンジを実行する
 * @param lastState 更新前のゲームステート
 * @returns 実行結果、実行不可能な場合は例外を返す
 */
export function turnChange(lastState: GameState): GameStateX<TurnChange> {
  const { players, activePlayerId } = lastState;
  const nextActivePlayer = players.find((p) => p.playerId !== activePlayerId);
  if (!nextActivePlayer) {
    throw new Error("not found next active player");
  }

  const { recoverBattery, battery } = calcRecoverBattery(nextActivePlayer);
  return {
    ...lastState,
    activePlayerId: nextActivePlayer.playerId,
    players: players.map((p) =>
      p.playerId === nextActivePlayer.playerId
        ? updateNextActivePlayer(p, battery)
        : p,
    ),
    effect: {
      name: "TurnChange",
      recoverBattery,
    },
  };
}
