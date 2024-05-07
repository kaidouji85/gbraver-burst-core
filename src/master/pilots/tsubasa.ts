import { Pilot } from "../../player/pilot";
import { PilotIds } from "./pilot-ids";

/** ツバサ */
export const Tsubasa: Pilot = {
  id: PilotIds.TSUBASA,
  name: "ツバサ",
  skill: {
    type: "BatteryEnhancementSkill",
    batteryEnhancement: 1,
    duration: 2,
  },
};
