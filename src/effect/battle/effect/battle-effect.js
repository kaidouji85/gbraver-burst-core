// @flow
import type {BattleResult} from "../result/battle-result";
import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {Battle} from "./index";

/**
 * 戦闘効果を生成する
 *
 * @param result 戦闘結果
 * @param attacker 攻撃側プレイヤー
 * @param attackerBattery 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderBattery 防御側バッテリー
 * @return 戦闘効果
 */
export function battleEffect(result: BattleResult, attacker: PlayerState, attackerBattery: BatteryCommand, defender: PlayerState, defenderBattery: BatteryCommand): Battle {
  return {
    name: 'Battle',
    attacker: attacker.playerId,
    attackerBattery: attackerBattery.battery,
    defenderBattery: defenderBattery.battery,
    result: result
  };
}