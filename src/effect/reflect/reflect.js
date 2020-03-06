// @flow

import type {PlayerId} from "../..";

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = 'Lightning';

/** ダメージ反射 */
export type Reflect = {
  name: 'Reflect',
  /** 反射ダメージを受けたプレイヤー */
  damagedPlayer: PlayerId,
  /** 反射するダメージ */
  damage: number,
  /** ダメージエフェクト */
  effect: ReflectDamageEffect,
  /** 死亡フラグ */
  isDeath: boolean,
};
