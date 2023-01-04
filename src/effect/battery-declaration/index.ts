import type { BatteryCommand } from "../../command/battery";
import type { PlayerId } from "../../player/player";
import type { GameState, GameStateX } from "../../state/game-state";
import type { PlayerState } from "../../state/player-state";
import { correctedBattery } from "../battery-correction";
import type { BatteryDeclaration } from "./battery-declaration";
import { updatePlayer } from "./update-player";

/**
 * 攻撃、防御のバッテリー宣言を実行する
 *
 * @param lastState 最新状態
 * @param attackerId 攻撃プレイヤーID
 * @param attackerBattery 攻撃バッテリー
 * @param defenderId 防御プレイヤーID
 * @param defenderBattery 防御バッテリー
 * @returns 更新結果、実行不可能な場合はnullを返す
 */
export function batteryDeclaration(
  lastState: GameState,
  attackerId: PlayerId,
  attackerBattery: BatteryCommand,
  defenderId: PlayerId,
  defenderBattery: BatteryCommand
): GameStateX<BatteryDeclaration> {
  const attacker: PlayerState | null | undefined = lastState.players.find(
    (v) => v.playerId === attackerId
  );
  const defender: PlayerState | null | undefined = lastState.players.find(
    (v) => v.playerId === defenderId
  );

  if (!attacker || !defender) {
    throw new Error("not found attacker or defender");
  }

  const updatedAttacker = updatePlayer(attacker, attackerBattery);
  const updatedDefender = updatePlayer(defender, defenderBattery);
  const updatedPlayers = lastState.players.map((v) => {
    if (v.playerId === updatedAttacker.playerId) {
      return updatedAttacker;
    } else if (v.playerId === updatedDefender.playerId) {
      return updatedDefender;
    } else {
      return v;
    }
  });
  const attackerCorrectedBattery = correctedBattery(
    attackerBattery,
    attacker.armdozer.effects
  );
  const defenderCorrectedBattery = correctedBattery(
    defenderBattery,
    defender.armdozer.effects
  );
  const effect: BatteryDeclaration = {
    name: "BatteryDeclaration",
    attacker: attacker.playerId,
    attackerBattery: attackerCorrectedBattery,
    originalBatteryOfAttacker: attackerBattery.battery,
    defenderBattery: defenderCorrectedBattery,
    originalBatteryOfDefender: defenderBattery.battery,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect,
  };
}
