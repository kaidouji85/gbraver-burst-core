// @flow

import type {ArmdozerState} from "../../game-state/armdozer-state";
import type {Burst} from "../../armdozer/burst";
import type {PlayerState} from "../../game-state/player-state";

/** バースト種別を明記したアームドーザステート */
export type BurstArmdozer<T> = $Diff<ArmdozerState, {burst: Burst}> & {burst: T};

/** バースト種別を明記したプレイヤーステート */
export type BurstPlayer<T> = $Diff<PlayerState, {armdozer: ArmdozerState}> & {armdozer: BurstArmdozer<T>};

