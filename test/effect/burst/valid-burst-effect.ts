import { BurstEffect } from "../../../src/effect/burst/burst-effect";

/** 有効なBurstEffect */
export const validBurstEffect: BurstEffect = {
  name: "BurstEffect",
  burstPlayer: "burst-player",
  burst: {
    type: "RecoverBattery",
    recoverBattery: 5,
    turnStartBatteryCorrect: 1,
  },
};
