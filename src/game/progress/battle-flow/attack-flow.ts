import { BatteryCommand } from "../../../command/battery";
import { batteryDeclaration } from "../../../effect/battery-declaration";
import { battle } from "../../../effect/battle";
import { GameState } from "../../../state/game-state";
import { PlayerCommandX } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";

/**
 * @deprecated
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
  return startGameFlow(lastState, [
    (state) => [
      batteryDeclaration({
        lastState: state,
        attackerCommand: attackerCommand,
        defenderCommand: defenderCommand,
      }),
    ],
    (state) =>
      state.effect.name === "BatteryDeclaration"
        ? [
            battle({
              lastState: state,
              attackerId: attackerCommand.playerId,
              attackerBattery: state.effect.attackerBattery,
              defenderId: defenderCommand.playerId,
              defenderBattery: state.effect.defenderBattery,
            }),
          ]
        : [],
  ]);
}
