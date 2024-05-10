import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** シンブレイバー */
export const ShinBraver: Armdozer = {
  id: ArmdozerIds.SHIN_BRAVER,
  name: "シンブレイバー",
  maxHp: 3100,
  maxBattery: 5,
  power: 2000,
  speed: 2000,
  burst: {
    type: "RecoverBattery",
    recoverBattery: 5,
    turnStartBatteryCorrect: 1,
  },
};
