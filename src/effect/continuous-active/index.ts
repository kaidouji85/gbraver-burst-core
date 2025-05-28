import * as R from "ramda";

import { GameState, GameStateX } from "../../state/game-state";
import { removeBatteryRecoverSkip } from "../remove-battery-recover-skip";
import { removeTurnStartBatteryCorrect } from "../remove-turn-start-battery-correct";
import { TurnChange } from "../turn-change/turn-change";
import { hasContinuousActive } from "./has-continuous-active";
import { removeContinuousActive } from "./remove-continuous-active";

/**
 * アクティブプレイヤー継続を実行できるか否かを判定する
 * @param state ゲームステート
 * @returns 判定結果、trueで実行できる
 */
export function canContinuousActive(state: GameState): boolean {
  const { activePlayerId, players } = state;
  const activePlayer = players.find((p) => p.playerId === activePlayerId);
  return activePlayer
    ? hasContinuousActive(activePlayer.armdozer.effects)
    : false;
}

/**
 * アクティブプレイヤー継続を実行する
 * @param state 更新前のゲーム ステート
 * @returns 更新結果、実行不可能な場合はnullを返す
 */
export function continuousActive(state: GameState): GameStateX<TurnChange> {
  const { players, activePlayerId } = state;
  const activePlayer = players.find((p) => p.playerId === activePlayerId);
  if (!activePlayer) {
    throw new Error("not found active player");
  }

  const updatedActivePlayer = {
    ...activePlayer,
    armdozer: {
      ...activePlayer.armdozer,
      effects: R.pipe(
        removeContinuousActive,
        removeBatteryRecoverSkip,
        removeTurnStartBatteryCorrect,
      )(activePlayer.armdozer.effects),
    },
  };
  const updatedPlayers = players.map((p) =>
    p.playerId === activePlayer.playerId ? updatedActivePlayer : p,
  );
  const effect: TurnChange = {
    name: "TurnChange",
    recoverBattery: 0,
    reason: "ContinuousActive",
  };
  return { ...state, players: updatedPlayers, effect };
}
