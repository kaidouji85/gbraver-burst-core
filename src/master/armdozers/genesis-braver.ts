import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ジェネシスブレイバー */
export const GenesisBraver: Armdozer = {
  id: ArmdozerIds.GENESIS_BRAVER,
  name: "ジェネシスブレイバー",
  maxHp: 3000,
  maxBattery: 4,
  batteryAutoRecovery: 3,
  power: 2200,
  speed: 1900,
  burst: {
    type: "BatteryLimitBreak",
    recoverBattery: 8,
    maxBattery: 8,
  },
};
