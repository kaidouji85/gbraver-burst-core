import { z } from "zod";

/** 全バースト共通で利用するバッテリー回復プロパティ */
export type BurstRecoverBattery = Readonly<{
  /** バッテリー回復量 */
  recoverBattery: number;
}>;

/** BurstRecoverBattery zodスキーマ */
export const BurstRecoverBatterySchema = z.object({
  recoverBattery: z.number(),
});

/**
 * 任意オブジェクトをBurstRecoverBatteryにパースする
 * @param origin パース元
 * @return パース結果、パースに失敗した場合はnull
 */
export const parseBurstRecoverBattery = (origin: unknown): BurstRecoverBattery | null => {
  const result = BurstRecoverBatterySchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** バッテリー回復 */
export type RecoverBattery = BurstRecoverBattery &
  Readonly<{
    type: "RecoverBattery";
  }>;

/** RecoverBattery zodスキーマ */
export const RecoverBatterySchema = BurstRecoverBatterySchema.extend({
  type: z.literal("RecoverBattery"),
});

/**
 * 任意オブジェクトをRecoverBatteryにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseRecoverBattery = (origin: unknown): RecoverBattery | null => {
  const result = RecoverBatterySchema.safeParse(origin);
  return result.success ? result.data : null;
}

/** 攻撃力バフ */
export type BuffPower = BurstRecoverBattery &
  Readonly<{
    type: "BuffPower";
    /** 攻撃力アップ */
    buffPower: number;
    /** バフ継続ターン数 */
    duration: number;
  }>;

/** BuffPower zodスキーマ */
export const BuffPowerSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("BuffPower"),
  buffPower: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをBuffPowerにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseBuffPower = (origin: unknown): BuffPower | null => {
  const result = BuffPowerSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/** 電撃バリア */
export type LightningBarrier = BurstRecoverBattery &
  Readonly<{
    type: "LightningBarrier";
    /** 電撃ダメージ */
    damage: number;
    /** バリア継続ターン数 */
    duration: number;
  }>;

/** LightningBarrier zodスキーマ */
export const LightningBarrierSchema = BurstRecoverBatterySchema.extend({
  type: z.literal("LightningBarrier"),
  damage: z.number(),
  duration: z.number(),
});

/**
 * 任意オブジェクトをLightningBarrierにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseLightningBarrierSchema = (origin: unknown): LightningBarrier | null => {
  const result = LightningBarrierSchema.safeParse(origin);
  return result.success ? result.data : null;
};

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
