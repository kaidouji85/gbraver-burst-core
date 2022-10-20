// @flow

/** フェイント */
export type Feint = {
  name: "Feint",
  isDefenderMoved: boolean,
};

/**
 * フェイントの戦闘結果を生成する
 *
 * @param defenderBattery 防御側バッテリー
 * @return フェイントの戦闘結果
 */
export function feint(defenderBattery: number): Feint {
  return {
    name: "Feint",
    isDefenderMoved: 0 < defenderBattery,
  };
}
