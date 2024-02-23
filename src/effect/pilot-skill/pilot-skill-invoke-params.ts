import { PlayerState } from "../../state/player-state";

/**
 * パイロットスキル発動パラメータ
 * @template X パイロットスキル情報
 */
export type PilotSkillInvokeParams<X> = {
  /** 発動するパイロットスキル */
  skill: X;
  /** パイロットスキル発動プレイヤー パイロットスキル前のステート */
  invoker: PlayerState;
  /** それ以外のプレイヤー パイロットスキル前のステート */
  other: PlayerState;
};
