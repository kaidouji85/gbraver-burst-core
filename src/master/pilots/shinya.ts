import { Pilot } from "../../player/pilot";
import { PilotIds } from "./pilot-ids";

/** シンヤ */
export const Shinya: Pilot = {
  id: PilotIds.SHINYA,
  name: "シンヤ",
  skill: {
    type: "RecoverBatterySkill",
    recoverBattery: 2,
  },
};
