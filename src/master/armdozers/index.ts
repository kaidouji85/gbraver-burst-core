import { Armdozer } from "../../player/armdozer";
import { DinoDozer } from "./dino-dozer";
import { GenesisBraver } from "./genesis-braver";
import { LightningDozer } from "./lightning-dozer";
import { NeoLandozer } from "./neo-landozer";
import { ShinBraver } from "./shin-braver";
import { WingDozer } from "./wing-dozer";

/** アームドーザのマスターデータ */
export const Armdozers: Armdozer[] = [
  ShinBraver,
  WingDozer,
  NeoLandozer,
  LightningDozer,
  GenesisBraver,
  DinoDozer,
];
