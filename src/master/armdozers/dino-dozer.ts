import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ダイナドーザ */
export const DinoDozer: Armdozer = {
  id: ArmdozerIds.DINO_DOZER,
  name: "ダイナドーザ",
  maxHp: 2600,
  maxBattery: 5,
  batteryAutoRecovery: 3,
  power: 2000,
  speed: 2500,
  burst: {
    type: "BatteryDrain",
    recoverBattery: 2,
    batteryDecrease: -2,
  },
};
