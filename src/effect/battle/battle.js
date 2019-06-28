// @flow
import type {BattleResult} from "./result/battle-result";
import type {PlayerId} from "../../player/player";

/** 戦闘 */
export type Battle = {
  name: 'Battle',
  /** 攻撃側プレイヤー */
  attacker: PlayerId,
  /** 攻撃側バッテリー */
  attackerBattery: number,
  /** 防御側バッテリー */
  defenderBattery: number,
  /** 戦闘結果 */
  result: BattleResult
};
