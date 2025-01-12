import { BatteryCommand } from "../../../command/battery";
import { batteryDeclaration } from "../../../effect/battery-declaration";
import { battle } from "../../../effect/battle";
import { GameState } from "../../../state/game-state";
import { PlayerCommandX } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";

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
            battle(
              state,
              state.effect.attacker,
              state.effect.attackerBattery,
              defenderCommand.playerId,
              state.effect.defenderBattery,
            ),
          ]
        : [],
  ]);
}
