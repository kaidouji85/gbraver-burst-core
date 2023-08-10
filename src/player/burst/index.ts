import { z } from "zod";

import { BurstRecoverBattery, BurstRecoverBatterySchema } from "./burst-recover-battery";

/** バッテリー回復 */
export type RecoverBattery = BurstRecoverBattery &
  Readonly<{
    type: "RecoverBattery";
  }>;

/** バッテリー回復 zodスキーマ */
export const RecoverBatterySchema = BurstRecoverBatterySchema.extend({
  type: z.literal("RecoverBattery"),
});

/** 攻撃力バフ */
export type BuffPower = BurstRecoverBattery &
  Readonly<{
    type: "BuffPower";
    /** 攻撃力アップ */
    buffPower: number;
    /** バフ継続ターン数 */
    duration: number;
  }>;

/** 電撃バリア */
export type LightningBarrier = BurstRecoverBattery &
  Readonly<{
    type: "LightningBarrier";
    /** 電撃ダメージ */
    damage: number;
    /** バリア継続ターン数 */
    duration: number;
  }>;

/** 連続攻撃 */
export type ContinuousAttack = BurstRecoverBattery &
  Readonly<{
    type: "ContinuousAttack";
  }>;

/** バッテリーリミットブレイク */
export type BatteryLimitBreak = BurstRecoverBattery &
  Readonly<{
    type: "BatteryLimitBreak";
    /** バースト後の最大バッテリー */
    maxBattery: number;
  }>;

/** バースト */
export type Burst =
| RecoverBattery
| BuffPower
| LightningBarrier
| ContinuousAttack
| BatteryLimitBreak;
