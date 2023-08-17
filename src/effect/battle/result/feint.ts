import { z } from "zod";

/** フェイント */
export type Feint = Readonly<{
  name: "Feint";
  /** 防御側が動いたか否か、trueで動いた */
  isDefenderMoved: boolean;
}>;

/** Feint zodスキーマ */
export const FeintSchema = z.object({
  name: z.literal("Feint"),
  isDefenderMoved: z.boolean(),
});

/**
 * 任意オブジェクトをFeintにパースする
 * @param origin パース元
 * @return パース結果、パースできない場合はnull
 */
export const parseFeint = (origin: unknown): Feint | null => {
  const result = FeintSchema.safeParse(origin);
  return result.success ? result.data : null;
};

/**
 * フェイントの戦闘結果を生成する
 * @param defenderBattery 防御側バッテリー
 * @return フェイントの戦闘結果
 */
export function feint(defenderBattery: number): Feint {
  return {
    name: "Feint",
    isDefenderMoved: 0 < defenderBattery,
  };
}
