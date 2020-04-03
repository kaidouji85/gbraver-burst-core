// @flow

import type {BattleResult, PlayerId} from "../..";

/** ダメージモーションリスト */
export type DamagedMotion =
  'NormalHit' |
  'CriticalHit' |
  'Guard' |
  'Miss' |
  'Feint';

/**
 * 防御側の体勢を立て直す
 */
export type RightItself = {
  name: 'RightItself',

  /** 防御側プレイヤー */
  defender: PlayerId,

  /** 現在のダメージモーション */
  //damagedMotion: DamagedMotion,

  // TODO 削除する
  /** 戦闘結果 */
  battleResult: BattleResult,
};