// @flow

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = 'Lightning';

/** ダメージ反射 */
export type Reflect = {
  name: 'Reflect',
  /** 反射するダメージ */
  damage: number,
  /** ダメージエフェクト */
  effect: ReflectDamageEffect
};
