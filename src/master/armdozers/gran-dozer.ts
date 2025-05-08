import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** グランドーザ */
export const GranDozer: Armdozer = {
  id: ArmdozerIds.GRAN_DOZER,
  name: "グランドーザ",
  maxHp: 3400,
  maxBattery: 5,
  power: 3000,
  speed: 700,
  burst: {
    type: "EffectClear",
    recoverBattery: 2,
  },
};
