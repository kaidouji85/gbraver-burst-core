import { PlayerState } from "../../state/player-state";
import { hasDamageHalved } from "../damage-halved";
import { toMinDamage } from "../to-min-damage";
import { ReflectParam } from "./reflect";

/**
 * ダメージ反射量を計算する
 * @param reflect ダメージ反射パラメータ
 * @param damagedPlayer ダメージ反射されるプレイヤー
 * @returns ダメージ
 */
export function reflectDamage(
  reflect: ReflectParam,
  damagedPlayer: PlayerState,
): number {
  const reduction = hasDamageHalved(damagedPlayer.armdozer.effects) ? 0.5 : 1;
  const damage = toMinDamage(reflect.damage * reduction);
  return Math.max(damage, 0);
}
