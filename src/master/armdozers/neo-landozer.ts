import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ネオランドーザ */
export const NeoLandozer: Armdozer = {
  id: ArmdozerIds.NEO_LANDOZER,
  name: "ネオランドーザ",
  maxHp: 3300,
  maxBattery: 5,
  batteryAutoRecovery: 3,
  power: 2300,
  speed: 1500,
  burst: {
    type: "BuffPower",
    recoverBattery: 3,
    buffPower: 1000,
    duration: 2,
  },
};
