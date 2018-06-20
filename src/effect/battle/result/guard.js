// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {Guard} from "../battle";

/**
 * 防御の戦闘結果を生成する
 *
 * @param attacker 攻撃側プレイヤー
 * @return 防御の戦闘結果
 */
export function guard(attacker: PlayerState): Guard {
  return {
    name: 'Guard',
    damage: attacker.armdozer.power / 2
  };
}
