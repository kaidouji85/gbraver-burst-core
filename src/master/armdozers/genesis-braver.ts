import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ジェネシスブレイバー */
export const GenesisBraver: Armdozer = {
  id: ArmdozerIds.GENESIS_BRAVER,
  name: "ジェネシスブレイバー",
  maxHp: 2600,
  maxBattery: 4,
  power: 2200,
  speed: 1900,
  burst: {
    type: "BatteryLimitBreak",
    recoverBattery: 8,
    maxBattery: 8,
  },
};
