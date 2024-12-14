import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** グランドーザ */
export const GranDozer: Armdozer = {
  id: ArmdozerIds.GRAN_DOZER,
  name: "グランドーザ",
  maxHp: 3300,
  maxBattery: 5,
  power: 2600,
  speed: 1200,
  burst: {
    type: "ForceTurnEnd",
    recoverBattery: 2,
  },
};
