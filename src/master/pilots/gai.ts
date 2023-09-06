import { Pilot } from "../../player/pilot";
import { PilotIds } from "./pilot-ids";

/** ガイ */
export const Gai: Pilot = {
  id: PilotIds.GAI,
  name: "ガイ",
  skill: {
    type: "BuffPowerSkill",
    buffPower: 600,
    duration: 2,
  },
};
