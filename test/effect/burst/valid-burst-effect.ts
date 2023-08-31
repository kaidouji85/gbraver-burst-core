import { BurstEffect } from "../../../src";

/** 有効なBurstEffect */
export const validBurstEffect: BurstEffect = {
  name: "BurstEffect",
  burstPlayer: "burst-player",
  burst: {
    type: "RecoverBattery",
    recoverBattery: 5,
  },
};
