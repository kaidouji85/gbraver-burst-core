// @flow

import type {ArmdozerState} from "../../state/armdozer-state";
import type {Burst} from "../../player/armdozer/burst";
import type {PlayerState} from "../../state/player-state";


/**
 * バースト種別を明記したアームドーザステート
 *
 * @deprecated
 */
export type BurstArmdozer<T> = $Diff<ArmdozerState, {burst: Burst}> & {burst: T};

/**
 * バースト種別を明記したプレイヤーステート
 *
 * @deprecated
 */
export type BurstPlayer<T> = $Diff<PlayerState, {armdozer: ArmdozerState}> & {armdozer: BurstArmdozer<T>};

