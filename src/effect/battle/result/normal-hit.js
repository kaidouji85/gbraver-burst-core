// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {NormalHit} from "../battle";

export function normalHit(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): NormalHit {
  return {
    name: 'NormalHit',
    damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand)
  };
}

export function normalHitDamage(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): number {
  return attacker.armdozer.power + 100 * (attackerCommand.battery - defenderCommand.battery - 1)
}