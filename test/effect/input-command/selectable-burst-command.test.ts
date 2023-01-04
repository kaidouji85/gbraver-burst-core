import { selectableBurstCommand } from "../../../src/effect/input-command/selectable-burst-command";
import { EMPTY_ARMDOZER_STATE } from "../../../src/empty/armdozer";

const ARMDOZER_STATE = { ...EMPTY_ARMDOZER_STATE,
  id: "test",
  name: "name",
  maxHp: 3000,
  hp: 3000,
  maxBattery: 5,
  battery: 5,
  power: 2000,
  speed: 2000,
  enableBurst: true
};

test("バーストフラグがONならバーストが使える", () => {
  expect(selectableBurstCommand(ARMDOZER_STATE)).toEqual([{
    type: "BURST_COMMAND"
  }]);
});

test("バーストフラグがOFFならバーストが使える", () => {
  expect(selectableBurstCommand({ ...ARMDOZER_STATE,
    enableBurst: false
  })).toEqual([]);
});