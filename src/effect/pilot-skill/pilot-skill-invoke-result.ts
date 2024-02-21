import { PlayerState } from "../../state/player-state";

/** パイロットスキル発動結果 */
export type PilotSkillInvokeResult = {
  /** パイロットスキル発動プレイヤー パイロットスキル発動後のステート */
  invoker: PlayerState;
  /** それ以外のプレイヤー パイロットスキル発動後のステート */
  other: PlayerState;
};
