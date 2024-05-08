import type { Armdozer } from "../player/armdozer";
import type { Burst } from "../player/burst";
import type { ArmdozerState } from "../state/armdozer-state";

/** 空のバースト */
export const EMPTY_BURST: Burst = {
  type: "RecoverBattery",
  recoverBattery: 0,
  turnStartBatteryCorrect: 0,
};

/** 空のアームドーザデータ */
export const EMPTY_ARMDOZER: Armdozer = {
  id: "id",
  name: "name",
  maxHp: 3000,
  maxBattery: 5,
  power: 2000,
  speed: 2000,
  burst: EMPTY_BURST,
};

/** 空のアームドーザゲームステート */
export const EMPTY_ARMDOZER_STATE: ArmdozerState = {
  ...EMPTY_ARMDOZER,
  battery: EMPTY_ARMDOZER.maxBattery,
  hp: EMPTY_ARMDOZER.maxHp,
  effects: [],
  enableBurst: true,
};
