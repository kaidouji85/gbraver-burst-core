// @flow

import type {Feint} from "../battle/battle-result";
import type {BatteryCommand} from "../../../command/battery";

/**
 * フェイントの戦闘結果を生成する
 *
 * @param defenderCommand 防御側バッテリー
 * @return フェイントの戦闘結果
 */
export function feint(defenderCommand: BatteryCommand): Feint {
  return {
    name: 'Feint',
    isDefenderMoved: 0 < defenderCommand.battery
  };
}