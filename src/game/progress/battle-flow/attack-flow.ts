import { BatteryCommand } from "../../../command/battery";
import { batteryDeclaration } from "../../../effect/battery-declaration";
import { battle } from "../../../effect/battle";
import { GameState } from "../../../state/game-state";
import { PlayerCommandX } from "../../command/player-command";

/**
 * プレイヤー攻撃フロー
 * @param lastState 最終ステート
 * @param attackerCommand 攻撃側バッテリーコマンド
 * @param defenderCommand 防御側バッテリーコマンド
 * @returns 更新されたゲームステート
 */
export function attackFlow(
  lastState: GameState,
  attackerCommand: PlayerCommandX<BatteryCommand>,
  defenderCommand: PlayerCommandX<BatteryCommand>,
): GameState[] {
  const doneBatteryDeclaration = batteryDeclaration({
    lastState,
    attackerCommand,
    defenderCommand,
  });
  const doneBattle = battle({
    lastState: doneBatteryDeclaration,
    attackerId: attackerCommand.playerId,
    attackerBattery: doneBatteryDeclaration.effect.attackerBattery,
    defenderId: defenderCommand.playerId,
    defenderBattery: doneBatteryDeclaration.effect.defenderBattery,
  });
  return [doneBatteryDeclaration, doneBattle];
}
