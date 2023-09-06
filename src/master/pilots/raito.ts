import { Pilot } from "../../player/pilot";
import { PilotIds } from "./pilot-ids";

/** ライト */
export const Raito: Pilot = {
  id: PilotIds.RAITO,
  name: "ライト",
  skill: {
    type: "DamageHalvedSkill",
    duration: 1,
  },
};
