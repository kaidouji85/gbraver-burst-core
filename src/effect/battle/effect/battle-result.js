// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {BatteryCommand} from "../../../command/battery";
import type {Feint} from "./feint";
import {feint} from "./feint";
import type {Guard} from "./guard";
import {guard} from "./guard";
import type {CriticalHit} from "./critical-hit";
import {criticalHit} from "./critical-hit";
import type {NormalHit} from "./normal-hit";
import {normalHit} from "./normal-hit";
import type {Miss} from "./miss";

/** 戦闘結果をまとめたもの */
export type BattleResult = NormalHit | Guard | CriticalHit | Miss | Feint;

/**
 * 戦闘結果を生成して返す
 *
 * @param attacker 攻撃側プレイヤー
 * @param attackerCommand 攻撃側バッテリー
 * @param defender 防御側プレイヤー
 * @param defenderCommand 防御側バッテリー
 * @return 戦闘結果
 */
export function battleResult(attacker: PlayerState, attackerCommand: BatteryCommand, defender: PlayerState, defenderCommand: BatteryCommand): BattleResult {
  if (attackerCommand.battery === 0) {
    return feint(defenderCommand);
  }

  if (attackerCommand.battery === defenderCommand.battery) {
    return guard(attacker);
  }

  if ((defenderCommand.battery < attackerCommand.battery) && defenderCommand.battery === 0) {
    return criticalHit(attacker, attackerCommand, defender, defenderCommand);
  }

  if (defenderCommand.battery < attackerCommand.battery) {
    return normalHit(attacker, attackerCommand, defender, defenderCommand);
  }

  return {name: 'Miss'};
}