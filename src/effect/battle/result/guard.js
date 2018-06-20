// @flow

import type {PlayerState} from "../../../game-state/player-state";
import type {Guard} from "../battle";

export function guard(attacker: PlayerState): Guard {
  return {
    name: 'Guard',
    damage: attacker.armdozer.power / 2
  };
}
