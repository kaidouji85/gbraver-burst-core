import { PlayerState } from "../state/player-state";

/**
 * バッテリー回復スキップ効果を削除する
 * @param player 効果削除対象のプレイヤー
 * @return 更新結果
 */
export function removeBatteryRecoverSkip(
  player: PlayerState
): PlayerState {
  return {
    ...player,
    armdozer: {
      ...player.armdozer,
      effects: player.armdozer.effects.filter(v => v.type !== 'BatteryRecoverSkip')
    }
  };
}
