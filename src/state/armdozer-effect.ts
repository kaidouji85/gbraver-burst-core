/** エフェクト有効期間 */
export type EffectPeriod = TurnLimitEffect | PermanentEffect;

/** ターン期限付きのエフェクト */
export type TurnLimitEffect = {
  type: "TurnLimit";
  /** 効果持続ターン */
  remainingTurn: number;
};

/** 半永久エフェクト */
export type PermanentEffect = {
  type: "Permanent";
};

/**
 * アームドーザに適用される効果
 * バフ、デバフなどのターン継続効果を想定している
 */
export type ArmdozerEffect =
  | EmptyArmdozerEffect
  | CorrectPower
  | HalveCorrectPower
  | TryReflect
  | ContinuousActivePlayer
  | BatteryCorrection
  | DamageHalved;

/**
 * 何もしない効果
 * 全ての効果か本タイプのプロパティを持つこと
 */
export type EmptyArmdozerEffect = {
  /** 効果判別用のプロパティ */
  type: "Empty";
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/** 攻撃力補正 */
export type CorrectPower = {
  type: "CorrectPower";
  /** 攻撃力補正値 */
  power: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/** 攻撃力補正半減 */
export type HalveCorrectPower = {
  type: "HalveCorrectPower";
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = "Lightning";

/** ダメージ反射 */
export type TryReflect = {
  type: "TryReflect";
  /** 反射が成功した場合のダメージ */
  damage: number;
  /** 反射のダメージエフェクト */
  effect: ReflectDamageEffect;
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/**
 * アクティブプレイヤー継続
 */
export type ContinuousActivePlayer = {
  type: "ContinuousActivePlayer";
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/**
 * バッテリー補正
 */
export type BatteryCorrection = {
  type: "BatteryCorrection";
  /** バッテリー補正値 */
  batteryCorrection: number;
  /** エフェクト有効期間 */
  period: EffectPeriod;
};

/**
 * ダメージ半減
 */
export type DamageHalved = {
  type: "DamageHalved";
  /** エフェクト有効期間 */
  period: EffectPeriod;
};
