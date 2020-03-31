// @flow

import type {ArmdozerEffect, PlayerId} from "../..";

/** 終了したアームドーザ効果 */
export type EndArmdozerEffects = {
  /** プレイヤーID */
  playerId: PlayerId,
  /** 終了したエフェクト */
  effects: ArmdozerEffect[]
};

/**
 * 効果継続ターン数を更新する
 */
export type UpdateRemainingTurn = {
  name: 'UpdateRemainingTurn',

  /** 終了したアームドーザ効果 */
  endArmdozerEffects: EndArmdozerEffects[],
};