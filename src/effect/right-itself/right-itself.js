// @flow

import type {BattleResult, PlayerId} from "../..";

/**
 * 防御側の体勢を立て直す
 */
export type RightItself = {
  name: 'RightItself',

  /** 防御側プレイヤー */
  defender: PlayerId,

  /** 戦闘結果 */
  battleResult: BattleResult,
};