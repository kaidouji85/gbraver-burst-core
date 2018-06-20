// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {CriticalHit} from "../battle";
import {normalHitDamage} from "./normal-hit";

export function criticalHit(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): CriticalHit {
  return {
    name: 'CriticalHit',
    damage: normalHitDamage(attacker, attackerCommand, defender, defenderCommand) * 2
  };
}