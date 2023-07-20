import type { Burst } from "./burst";

/** アームドーザID */
export type ArmDozerId = string;

/**
 * アームドーザ基本情報（型指定あり）
 * @template X バースト
 */
export type ArmdozerX<X> = Readonly<{
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
  /** バースト */
  burst: X;
}>;

/** アームドーザ基本情報 */
export type Armdozer = ArmdozerX<Burst>;
