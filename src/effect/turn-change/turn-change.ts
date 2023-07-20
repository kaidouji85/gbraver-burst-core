/** ターン変更 */
export type TurnChange = Readonly<{
  name: "TurnChange";
  /** バッテリー回復量 */
  recoverBattery: number;
}>;
