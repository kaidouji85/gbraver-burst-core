// @flow

import type {PlayerState} from "../state/player-state";
import {EMPTY_ARMDOZER_STATE} from "./armdozer";
import {EMPTY_PILOT_STATE} from "./pilot";

/** 空のプレイヤーステート */
export const EMPTY_PLAYER_STATE: PlayerState = {
  playerId: '',
  armdozer: EMPTY_ARMDOZER_STATE,
  pilot: EMPTY_PILOT_STATE,
};
