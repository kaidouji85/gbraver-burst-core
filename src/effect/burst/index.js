// @flow

import type {GameState} from "../../game-state/game-state";
import type {PlayerState} from "../../game-state/player-state";
import type {PlayerId} from "../../player/player";

/**
 * バーストを実施する
 *
 * @param lastState 最新の状態
 * @param burstPlayerId バーストするプレイヤーID
 * @return バースト実施後の状態
 */
export function doBurst(lastState: GameState, burstPlayerId: PlayerId): GameState {
  const burstPlayer = lastState.players.find(v => v.playerId === burstPlayerId);
  const otherPlayer = lastState.players.find(v => v.playerId !== burstPlayerId);
  if (!burstPlayer || !otherPlayer) {
    return lastState;
  }

  return {
    ...lastState,
    players: updateForBurst(burstPlayer, otherPlayer)
  };
}

/**
 * 各プレイヤーのステータスをバースト実施後のものに更新する
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function updateForBurst(burstPlayer: PlayerState, otherPlayer: PlayerState): PlayerState[] {
  switch (burstPlayer.armdozer.burst.type) {
    case 'RecoverBattery':
      return doRecoverBattery(burstPlayer, otherPlayer);
    default:
      return [burstPlayer, otherPlayer];
  }
}

/**
 * バースト効果 バッテリー回復
 *
 * @param burstPlayer バーストするプレイヤーの状態
 * @param otherPlayer それ以外のプレイヤーの状態
 * @return バースト実施後の状態
 */
export function doRecoverBattery(burstPlayer: PlayerState, otherPlayer: PlayerState): PlayerState[] {
  if (burstPlayer.armdozer.burst.type !== 'RecoverBattery') {
    return [burstPlayer, otherPlayer];
  }

  return [
    {
      ...burstPlayer,
      armodzer: {
        ...burstPlayer.armdozer,
        battery: getRecoverBattery(burstPlayer),
        enableBurst: false,
      }
    },
    otherPlayer,
  ];
}

/**
 * バーストで回復した後のバッテリー値を計算する
 *
 * @param player バーストするプレイヤーの状態
 * @return バースト実施後のバッテリー値
 */
export function getRecoverBattery(player: PlayerState): number {
  return Math.min(player.armdozer.battery + player.armdozer.burst.recoverBattery, player.armdozer.maxBattery);
}