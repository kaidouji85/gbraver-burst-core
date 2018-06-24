// @flow
import type {BattleResult} from "../battle";
import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";

/**
 * コマンドに応じて攻撃側ステータスを更新する
 *
 * @param attacker 更新前の攻撃側ステータス
 * @param attackerCommand 攻撃側コマンド
 * @return 更新された攻撃側ステータス
 */
export function updateAttacker(attacker: PlayerState, attackerCommand: BatteryCommand): PlayerState {
  return {
    ...attacker,
    armdozer: {
      ...attacker.armdozer,
      battery: attacker.armdozer.battery - attackerCommand.battery
    }
  };
}