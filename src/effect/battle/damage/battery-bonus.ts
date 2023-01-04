/**
 * バッテリーによるダメージボーナス
 *
 * @param attackBattery 攻撃側が出したバッテリー
 * @param defenseBattery 防御側が出したバッテリー
 * @return ダメージボーナス
 */
export function batteryBonus(
  attackBattery: number,
  defenseBattery: number
): number {
  return 100 * Math.max(attackBattery - defenseBattery - 1, 0);
}
