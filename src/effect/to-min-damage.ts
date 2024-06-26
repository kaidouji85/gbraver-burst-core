/**
 * ダメージ最低値に補正する
 *
 * @param damage ダメージ
 * @returns 補正後の値
 */
export function toMinDamage(damage: number): number {
  return Math.max(0, damage);
}
