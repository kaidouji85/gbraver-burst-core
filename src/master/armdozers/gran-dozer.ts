import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** グランドーザ */
export const GranDozer: Armdozer = {
  id: ArmdozerIds.GRAN_DOZER,
  name: "グランドーザ",
  maxHp: 3600,
  maxBattery: 5,
  power: 2500,
  speed: 1000,
  burst: {
    type: "ForceTurnEnd",
    recoverBattery: 2,
  },
};
