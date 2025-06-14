import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ライトニングドーザ */
export const LightningDozer: Armdozer = {
  id: ArmdozerIds.LIGHTNING_DOZER,
  name: "ライトニングドーザ",
  maxHp: 3400,
  maxBattery: 5,
  batteryAutoRecovery: 3,
  power: 1900,
  speed: 1800,
  burst: {
    type: "LightningBarrier",
    recoverBattery: 3,
    damage: 2000,
    duration: 2,
  },
};
