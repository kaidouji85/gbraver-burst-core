// @flow

import type {BuffPower} from "../../player/burst";
import type {PlayerState} from "../../game/state/player-state";
import {burstRecoverBattery} from "./burst-recover-battery";
import type {GameState, PlayerId} from "../..";

/**
 * バースト 攻撃力アップ
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @param burst バースト情報
 * @return 更新結果
 */
export function buffPower(lastState: GameState, burstPlayerId: PlayerId, burst: BuffPower): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  if (!burstPlayer) {
    return lastState;
  }

  const updatedBurstPlayer: PlayerState = {
    ...burstPlayer,
    armdozer: {
      ...burstPlayer.armdozer,
      battery: burstRecoverBattery(burstPlayer.armdozer, burst),
      effects: [
        ...burstPlayer.armdozer.effects,
        {
          type: 'CorrectPower',
          power: burst.buffPower,
          remainingTurn: burst.duration,
        }
      ]
    }
  };
  const updatedPlayers = lastState.players.map(player => player.playerId === burstPlayerId
    ? updatedBurstPlayer
    : player
  );
  return {
    ...lastState,
    players: updatedPlayers,
    effect: {
      name: 'BurstEffect',
      burstPlayer: burstPlayerId,
      burst: burst,
    }
  };
}