// @flow

import type { Player } from "../player/player";
import type { PlayerState } from "../state/player-state";
import { EMPTY_ARMDOZER, EMPTY_ARMDOZER_STATE } from "./armdozer";
import { EMPTY_PILOT, EMPTY_PILOT_STATE } from "./pilot";

/** 空のプレイヤー */
export const EMPTY_PLAYER: Player = {
  playerId: "",
  armdozer: EMPTY_ARMDOZER,
  pilot: EMPTY_PILOT,
};

/** 空のプレイヤーステート */
export const EMPTY_PLAYER_STATE: PlayerState = {
  playerId: "",
  armdozer: EMPTY_ARMDOZER_STATE,
  pilot: EMPTY_PILOT_STATE,
};
