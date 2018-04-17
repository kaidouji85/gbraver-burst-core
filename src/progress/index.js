// @flow
import type {Command} from "../command/command";
import type {GameState} from "../game-state/game-state";
import type {PhaseName} from "../phase/phase-name";
import {PhaseNameList} from "../phase/phase-name";
import type {PlayerCommand} from "../command/player-command";
import {doEndPhase} from "../phase/end-phase";

/**
 * ゲームを進める
 *
 * @param lastState 最後の状態
 * @param command1 プレイヤー1のコマンド
 * @param command2 プレイヤー2のコマンド
 * @return 更新されたゲーム状態
 */
export function progress(lastState: GameState, commands: PlayerCommand[], count: number = 100): GameState[] {
  if (count <= 0) {
    return [];
  }

  const phase = getNextPhase(lastState.phase, commands);
  const update = executePhase(phase, lastState, commands);

  if (isContinue(update)) {
    return update.concat(progress(update[update.length - 1], commands, count -1));
  }

  return update;
}

function getNextPhase(phase: PhaseName, commands: PlayerCommand[]): PhaseName {
  switch (phase) {
    case PhaseNameList.COMMAND_PHASE:
      return PhaseNameList.END_PHASE;
    case PhaseNameList.END_PHASE:
      return PhaseNameList.COMMAND_PHASE;
    default:
      return PhaseNameList.COMMAND_PHASE;
  }
}

function executePhase(phase: PhaseName, lastState: GameState, commands: PlayerCommand[]): GameState[] {
  switch(phase) {
    case PhaseNameList.END_PHASE:
      return doEndPhase(lastState);
    default:
      return [];
  }
}

function isContinue(updateState: GameState[]): boolean {
  if (updateState.length <= 0) {
    return false;
  }

  const lastPhase = updateState[updateState.length - 1].phase;
  if (lastPhase === PhaseNameList.COMMAND_PHASE || lastPhase === PhaseNameList.COMMAND_PHASE2) {
    return false;
  }

  return true;
}