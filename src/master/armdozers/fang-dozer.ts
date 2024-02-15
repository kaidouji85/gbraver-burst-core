import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ファングドーザ */
export const FangDozer: Armdozer = {
  id: ArmdozerIds.FANG_DOZER,
  name: "ファングドーザ",
  maxHp: 2600,
  maxBattery: 5,
  power: 2000,
  speed: 2500,
  burst: {
    type: "BatteryDrain",
    recoverBattery: 2,
    batteryDecrease: -2,
  },
};
