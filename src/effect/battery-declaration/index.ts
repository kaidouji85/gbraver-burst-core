import { BatteryCommand } from "../../command/battery";
import { PlayerCommandX } from "../../game/command/player-command";
import { GameState, GameStateX } from "../../state/game-state";
import { correctedBattery } from "../battery-correction";
import { BatteryDeclaration } from "./battery-declaration";
import { consumePlayerBattery } from "./consume-player-battery";

/** オプション */
type Options = {
  /** 最新状態 */
  lastState: GameState;
  /** 攻撃側のバッテリーコマンド */
  attackerCommand: PlayerCommandX<BatteryCommand>;
  /** 防御側のバッテリーコマンド */
  defenderCommand: PlayerCommandX<BatteryCommand>;
};

/**
 * 攻撃、防御のバッテリー宣言を実行する
 * @param options オプション
 * @returns 更新結果、実行不可能な場合はnullを返す
 */
export function batteryDeclaration(
  options: Options,
): GameStateX<BatteryDeclaration> {
  const { lastState, attackerCommand, defenderCommand } = options;
  const { playerId: attackerId, command: attackerBattery } = attackerCommand;
  const { playerId: defenderId, command: defenderBattery } = defenderCommand;
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
