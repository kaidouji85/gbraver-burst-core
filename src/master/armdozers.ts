import type { Armdozer } from "../player/armdozer";

/** アームドーザIDマスタ */
export const ArmdozerIds = {
  SHIN_BRAVER: "SHIN_BRAVER",
  NEO_LANDOZER: "NEO_LANDOZER",
  LIGHTNING_DOZER: "LIGHTNING_DOZER",
  WING_DOZER: "WING_DOZER",
  GENESIS_BRAVER: "GENESIS_BRAVER",
};

/** アームドーザのマスターデータ */
export const Armdozers: Armdozer[] = [
  {
    id: ArmdozerIds.SHIN_BRAVER,
    name: "シンブレイバー",
    maxHp: 3100,
    maxBattery: 5,
    power: 2000,
    speed: 2000,
    burst: {
      type: "RecoverBattery",
      recoverBattery: 5,
    },
  },
  {
    id: ArmdozerIds.NEO_LANDOZER,
    name: "ネオランドーザ",
    maxHp: 3300,
    maxBattery: 5,
    power: 2300,
    speed: 1500,
    burst: {
      type: "BuffPower",
      recoverBattery: 3,
      buffPower: 1000,
      duration: 2,
    },
  },
  {
    id: ArmdozerIds.LIGHTNING_DOZER,
    name: "ライトニングドーザ",
    maxHp: 3400,
    maxBattery: 5,
    power: 1900,
    speed: 1800,
    burst: {
      type: "LightningBarrier",
      recoverBattery: 3,
      damage: 2000,
      duration: 2,
    },
  },
  {
    id: ArmdozerIds.WING_DOZER,
    name: "ウィングドーザ",
    maxHp: 2700,
    maxBattery: 5,
    power: 2200,
    speed: 2200,
    burst: {
      type: "ContinuousAttack",
      recoverBattery: 3,
    },
  },
  {
    id: ArmdozerIds.GENESIS_BRAVER,
    name: "ジェネシスブレイバー",
    maxHp: 3000,
    maxBattery: 4,
    power: 2200,
    speed: 1900,
    burst: {
      type: "BatteryLimitBreak",
      recoverBattery: 8,
      maxBattery: 8,
    },
  },
];
