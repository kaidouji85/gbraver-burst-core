// @flow

import type {PlayerId, TryReflect} from "../..";

/** ダメージエフェクトの種類 */
export type ReflectDamageEffect = 'Lightning';

/**
 * ダメージ反射 パラメータ
 */
export type ReflectParam = {
  /** 反射するダメージ */
  damage: number,
  /** ダメージエフェクト */
  effect: ReflectDamageEffect,
};

/**
 * ダメージ反射ステートをダメージ反射パラメータに変換する
 *
 * @param burst 変換元
 * @return 変換結果
 */
export function toReflectParam(burst: TryReflect): ReflectParam {
  return {
    damage: burst.damage,
    effect: 'Lightning'
  };
}

/**
 * ダメージ反射 結果
 */
export type Reflect = ReflectParam & {
  name: 'Reflect',
  /** 反射ダメージを受けたプレイヤー */
  damagedPlayer: PlayerId,
  /** 死亡フラグ */
  isDeath: boolean,
};
