import type { BatteryCommand } from "../../../command/battery";
import { batteryDeclaration } from "../../../effect/battery-declaration";
import { battle } from "../../../effect/battle";
import type { GameState } from "../../../state/game-state";
import type { PlayerCommandX } from "../../command/player-command";
import { startGameFlow } from "../../game-flow";

/**
 * プレイヤー攻撃フロー
 * @param lastState 最終ステート
 * @param attacker 攻撃側バッテリーコマンド
 * @param defender 防御側バッテリーコマンド
 * @return 更新されたゲームステート
 */
export function attackFlow(
  lastState: GameState,
  attacker: PlayerCommandX<BatteryCommand>,
  defender: PlayerCommandX<BatteryCommand>,
): GameState[] {
  return startGameFlow([
    (state) => [
      batteryDeclaration(
        state,
        attacker.playerId,
        attacker.command,
        defender.playerId,
        defender.command,
      ),
    ],
    (state) =>
      state.effect.name === "BatteryDeclaration"
        ? [
            battle(
              state,
              state.effect.attacker,
              state.effect.attackerBattery,
              defender.playerId,
              state.effect.defenderBattery,
            ),
          ]
        : [],
  ], lastState);
}
