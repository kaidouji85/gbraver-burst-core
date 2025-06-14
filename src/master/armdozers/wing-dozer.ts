import { Armdozer } from "../../player/armdozer";
import { ArmdozerIds } from "./armdozer-ids";

/** ウィングドーザ */
export const WingDozer: Armdozer = {
  id: ArmdozerIds.WING_DOZER,
  name: "ウィングドーザ",
  maxHp: 2700,
  maxBattery: 5,
  batteryAutoRecovery: 3,
  power: 2200,
  speed: 2200,
  burst: {
    type: "ContinuousAttack",
    recoverBattery: 3,
  },
};
