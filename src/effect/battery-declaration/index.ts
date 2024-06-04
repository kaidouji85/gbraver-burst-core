import { BatteryCommand } from "../../command/battery";
import { PlayerId } from "../../player/player";
import { GameState, GameStateX } from "../../state/game-state";
import { correctedBattery } from "../battery-correction";
import { BatteryDeclaration } from "./battery-declaration";
import { consumePlayerBattery } from "./consume-player-battery";

/**
 * 攻撃、防御のバッテリー宣言を実行する
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
  defenderBattery: BatteryCommand,
): GameStateX<BatteryDeclaration> {
  const attacker = lastState.players.find((p) => p.playerId === attackerId);
  const defender = lastState.players.find((p) => p.playerId === defenderId);
  if (!attacker || !defender) {
    throw new Error("not found attacker or defender");
  }

  const updatedPlayers = lastState.players.map((p) => {
    const batteryCommand =
      p.playerId === attackerId ? attackerBattery : defenderBattery;
    return consumePlayerBattery(p, batteryCommand);
  });
  const effect: BatteryDeclaration = {
    name: "BatteryDeclaration",
    attacker: attacker.playerId,
    attackerBattery: correctedBattery(
      attackerBattery,
      attacker.armdozer.effects,
    ),
    originalBatteryOfAttacker: attackerBattery.battery,
    defenderBattery: correctedBattery(
      defenderBattery,
      defender.armdozer.effects,
    ),
    originalBatteryOfDefender: defenderBattery.battery,
  };
  return {
    ...lastState,
    players: updatedPlayers,
    effect: effect,
  };
}
