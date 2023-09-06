import { Pilot } from "../../player/pilot";
import { PilotIds } from "./pilot-ids";

/** ユウヤ */
export const Yuuya: Pilot = {
  id: PilotIds.YUUYA,
  name: "ユウヤ",
  skill: {
    type: "BatteryBoostSkill",
    recoverBattery: 5,
  },
};
