import { PlayerState } from "../state/player-state";
import { hasDamageHalved } from "./damage-halved";

/**
 * ダメージ減少率を計算する
 * @param defender 防御側のステート
 * @return 計算結果
 */
export const damageReduction = (defender: PlayerState): number =>
  hasDamageHalved(defender.armdozer.effects) ? 0.5 : 1;