// @flow

import type {PlayerState} from "../../src/game/state/player-state";
import {EMPTY_ARMDOZER_STATE} from "./armdozer";

/** 空のプレイヤーステート */
export const EMPTY_PLAYER_STATE: PlayerState = {
  playerId: '',
  armdozer: EMPTY_ARMDOZER_STATE,
};
