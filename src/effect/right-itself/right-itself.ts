import type { PlayerId } from "../../player/player";
import type { BattleResult } from "../battle/result/battle-result";

/**
 * 防御側の体勢を立て直す
 */
export type RightItself = {
  name: "RightItself";

  /** 防御側プレイヤー */
  defender: PlayerId;

  /** 戦闘結果 */
  battleResult: BattleResult;
};
