/** 電池を出すコマンド */
export type BatteryCommand = {
  type: "BATTERY_COMMAND";
  battery: number;
};
