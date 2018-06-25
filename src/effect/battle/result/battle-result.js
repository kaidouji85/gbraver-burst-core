// @flow

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
  isDefenderMoved: boolean
}