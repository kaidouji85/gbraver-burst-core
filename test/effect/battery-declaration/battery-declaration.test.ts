import { BatteryCommand, GameState, PlayerState } from "../../../src";
import { batteryDeclaration } from "../../../src/effect/battery-declaration";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";
import { EMPTY_GAME_STATE } from "../../../src/empty/game-state";
import { EMPTY_PLAYER_STATE } from "../../../src/empty/player";

test("バッテリー宣言が正しく処理される", () => {
  const attacker: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "attacker",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 4,
      maxBattery: 5,
      effects: [
        {
          type: "BatteryCorrection",
          batteryCorrection: 1,
          period: {
            type: "TurnLimit",
            remainingTurn: 1,
          },
        },
      ],
    },
  };
  const defender: PlayerState = {
    ...EMPTY_PLAYER_STATE,
    playerId: "defender",
    armdozer: {
      ...EMPTY_ARMDOZER_STATE,
      battery: 5,
      maxBattery: 5,
      effects: [
        {
          type: "BatteryCorrection",
          batteryCorrection: -1,
          period: {
            type: "TurnLimit",
            remainingTurn: 1,
          },
        },
      ],
    },
  };
  const lastState: GameState = {
    ...EMPTY_GAME_STATE,
    activePlayerId: attacker.playerId,
    players: [attacker, defender],
  };
  const attackerBattery: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 3,
  };
  const defenderBattery: BatteryCommand = {
    type: "BATTERY_COMMAND",
    battery: 2,
  };
  const result = batteryDeclaration(
    lastState,
    attacker.playerId,
    attackerBattery,
    defender.playerId,
    defenderBattery,
  );
  const expected = {
    ...lastState,
    players: [
      { ...attacker, armdozer: { ...attacker.armdozer, battery: 1 } },
      { ...defender, armdozer: { ...defender.armdozer, battery: 3 } },
    ],
    effect: {
      name: "BatteryDeclaration",
      attacker: "attacker",
      attackerBattery: 4,
      originalBatteryOfAttacker: 3,
      defenderBattery: 1,
      originalBatteryOfDefender: 2,
    },
  };
  expect(result).toEqual(expected);
});
