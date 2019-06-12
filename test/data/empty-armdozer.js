// @flow

import type {Armdozer} from "../../src/armdozer/armdozer";
import type {ArmdozerState} from "../../src/game-state/armdozer-state";

/** テストのベースとなるアームドーザデータ */
export const EMPTY_ARMDOZER: Armdozer = {
  id: 'id',
  name: 'name',
  maxHp: 3000,
  maxBattery: 5,
  power: 2000,
  speed: 2000,
  appearance: 'appearance',
};

/** テストのベースとなるアームドーザ(ゲーム状態) */
export const EMPTY_ARMDOZER_STATE: ArmdozerState = {
  ...EMPTY_ARMDOZER,
  battery: EMPTY_ARMDOZER.maxBattery,
  hp: EMPTY_ARMDOZER.maxHp
}
