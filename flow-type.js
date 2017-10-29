// @flow

/**プロジェクト全体で使うデータ型をまとめたもの */

export const ArmDozerIdList = {
  SHIN_BRAVER: 'SHIN_BRAVER',
  NEO_LANDOZER: 'NEO_LANDOZER',
}

/** アームドーザID */
export type ArmDozerId = $Keys<typeof ArmDozerIdList>;

/** アームドーザ基本ステータス */
export type ArmDozerBasic = {
  /** アームドーザID */
  id: ArmDozerId;
  /** 名前 */
  name: string;
  /** 最大HP */
  maxHp: number;
  /** 最大バッテリー */
  maxBattery: number;
  /** 攻撃 */
  power: number;
  /** スピード */
  speed: number;
};

/** 戦闘時のアームドーザ状態 */
export type ArmDozerBattleState = ArmDozerBasic & {
  /** 現在のHP */
  hp: number;
  /** 現在のバッテリー */
  battery: number;
};