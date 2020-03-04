// @flow
import type {BattleResult} from "./result/battle-result";
import type {PlayerId} from "../../player/player";

/**
 * 戦闘
 *
 * @typeparam {X} 戦闘結果
 */
export type BattleX<X> = {
  name: 'Battle',
  /** 攻撃側プレイヤー */
  attacker: PlayerId,
  /** 死亡フラグ、trueで防御側が死亡 */
  isDeath: boolean,
  /** 戦闘結果 */
  result: X
};

/** 戦闘 */
export type Battle = BattleX<BattleResult>
