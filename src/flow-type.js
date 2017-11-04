// @flow

/**
 * プロジェクト全体で使うデータ型をまとめたもの
 */

/** アームドーザID */
export type ArmDozerId = string;

/** アームドーザ基本ステータス */
export type ArmDozerBasicStatus = {
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
export type ArmDozerBattleStatus = ArmDozerBasicStatus & {
  /** 現在のHP */
  hp: number;
  /** 現在のバッテリー */
  battery: number;
};

/** プレイヤーID */
export type PlayerId = string;

/** プレイヤーの情報 */
export type PlayerBattleState = {
  playerId: PlayerId;
  armDozer: ArmDozerBattleStatus;
};

/** ゲーム全体の状態 */
export type BattleState = {
  /** プレイヤー毎の状態 */
  players: PlayerBattleState[];
  /** 現在攻撃側のプレイヤーのIDをセットする */
  turn: PlayerId;
  /** ターンカウント */
  count: number;
}