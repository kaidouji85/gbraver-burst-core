import type { Pilot } from "../player/pilot/pilot";

/** パイロットIDを集めたもの */
export const PilotIds = {
  SHINYA: "SHINYA",
  GAI: "GAI",
  RAITO: "RAITO",
  TSUBASA: "TSUBASA",
  YUUYA: "YUUYA",
};

/** パイロットマスタ */
export const Pilots: Pilot[] = [
  {
    id: PilotIds.SHINYA,
    name: "シンヤ",
    skill: {
      type: "RecoverBatterySkill",
      recoverBattery: 2,
    },
  },
  {
    id: PilotIds.GAI,
    name: "ガイ",
    skill: {
      type: "BuffPowerSkill",
      buffPower: 600,
      duration: 2,
    },
  },
  {
    id: PilotIds.RAITO,
    name: "ライト",
    skill: {
      type: "DamageHalvedSkill",
      duration: 1,
    },
  },
  {
    id: PilotIds.TSUBASA,
    name: "ツバサ",
    skill: {
      type: "BatteryEnchantmentSkill",
      batteryEnchantment: 1,
      duration: 2,
    },
  },
  {
    id: PilotIds.YUUYA,
    name: "ユウヤ",
    skill: {
      type: "BatteryBoostSkill",
      recoverBattery: 5,
    },
  },
];
