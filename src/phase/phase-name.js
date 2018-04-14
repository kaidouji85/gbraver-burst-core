// @flow

/** フェイズ名 */
export type PhaseName = $Keys<typeof PhaseNameList>;

/** フェイズ名リスト */
export const PhaseNameList = {
  CHARGE_PHASE: 'CHARGE_PHASE',
  COMMAND_PHASE: 'COMMAND_PHASE',
  BURST_PHASE: 'BURST_PHASE',
  COMMAND_PHASE2: 'COMMAND_PHASE2',
  BATTLE_PHASE: 'BATTLE_PHASE',
  END_PHASE: 'END_PHASE'
};
