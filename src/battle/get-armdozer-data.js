// @flow
import type {ArmDozerBasicStatus, ArmDozerId} from "../flow-type";

export const DEFAULT_ARMDOZER: ArmDozerBasicStatus = {
  id: 'default',
  name: 'デフォルト',
  maxHp: 1000,
  maxBattery: 5,
  power: 1000,
  speed: 1000
};

/**
 * 指定したアームドーザIDのデータをマスタから取得する
 * 指定したアームドーザIDがマスタに存在しない場合、デフォルトのステータスを返す
 *
 * @param armDozerId
 * @param masters
 * @returns {ArmDozerBasicStatus}
 */
export function getArmDozerData(armDozerId: ArmDozerId, masters: ArmDozerBasicStatus[]): ArmDozerBasicStatus {
  return masters.find(v => v.id === armDozerId) || DEFAULT_ARMDOZER;
}
