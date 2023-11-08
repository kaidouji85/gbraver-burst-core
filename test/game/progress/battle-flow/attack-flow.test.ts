import {
  BatteryCommand,
  EMPTY_GAME_STATE,
  EMPTY_PLAYER_STATE,
  PlayerCommandX,
} from "../../../../src";
import { attackFlow } from "../../../../src/game/progress/battle-flow/attack-flow";

test("バッテリー宣言から攻撃までを正しく進めることができる", () => {
  const attacker = { ...EMPTY_PLAYER_STATE, playerId: "attacker" };
  const attackerBattery: PlayerCommandX<BatteryCommand> = {
    playerId: attacker.playerId,
    command: {
      type: "BATTERY_COMMAND",
      battery: 3,
    },
  };
  const defender = { ...EMPTY_PLAYER_STATE, playerId: "player2" };
  const defenderBattery: PlayerCommandX<BatteryCommand> = {
    playerId: defender.playerId,
    command: {
      type: "BATTERY_COMMAND",
      battery: 2,
    },
  };
  const lastState = {
    ...EMPTY_GAME_STATE,
    players: [attacker, defender],
    activePlayerId: attacker.playerId,
  };
  const result = attackFlow(lastState, attackerBattery, defenderBattery);
  expect(result).toMatchSnapshot();
});
