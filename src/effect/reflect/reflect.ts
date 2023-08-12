import type { PlayerId } from "../../player/player";
import type {
  ReflectDamageEffect,
  TryReflect,
} from "../../state/armdozer-effect/armdozer-effect";
import type { PlayerState } from "../../state/player-state";
import { hasDamageHalved } from "../damage-halved";
import { toMinDamage } from "../to-min-damage";

/** ダメージ反射 パラメータ */
export type ReflectParam = Readonly<{
  /** 反射するダメージ */
  damage: number;
  /** ダメージエフェクト */
  effect: ReflectDamageEffect;
}>;

/** ダメージ反射 結果 */
export type Reflect = ReflectParam &
  Readonly<{
    name: "Reflect";
    /** 反射ダメージを受けたプレイヤー */
    damagedPlayer: PlayerId;
    /** 死亡フラグ */
    isDeath: boolean;
  }>;

/**
 * ダメージ反射ステートをダメージ反射パラメータに変換する
 * @param burst 変換元
 * @return 変換結果
 */
export function toReflectParam(burst: TryReflect): ReflectParam {
  return {
    damage: burst.damage,
    effect: "Lightning",
  };
}

/**
 * ダメージ反射量を計算する
 * @param reflect ダメージ反射パラメータ
 * @param damagedPlayer ダメージ反射されるプレイヤー
 * @return ダメージ
 */
export function reflectDamage(
  reflect: ReflectParam,
  damagedPlayer: PlayerState,
): number {
  const reduction = hasDamageHalved(damagedPlayer.armdozer.effects) ? 0.5 : 1;
  const damage = toMinDamage(reflect.damage * reduction);
  return Math.max(damage, 0);
}
