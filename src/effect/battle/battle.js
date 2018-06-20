// @flow

import type {PlayerId} from "../../player/player";

/** 戦闘 */
export type Battle = {
  name: 'Battle',
  /** 攻撃側プレイヤー */
  attacker: PlayerId,
  /** 戦闘結果 */
  result: BattleResult
}

/** 戦闘結果をまとめたもの */
export type BattleResult = NormalHit | Guard | CriticalHit | Miss | Feint;

/** 攻撃ヒット */
export type NormalHit = {
  name: 'NormalHit',
  damage: number
};

/** ガード */
export type Guard = {
  name: 'Guard',
  damage: number
};

/** クリティカルヒット */
export type CriticalHit = {
  name: 'CriticalHit',
  damage: number
};

/** ミス */
export type Miss = {
  name: 'Miss'
};

/** フェイント */
export type Feint = {
  name: 'Feint',
  isEnemyMoved: boolean
}