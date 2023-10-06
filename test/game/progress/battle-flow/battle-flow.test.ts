import { battleFlow } from "../../../../src/game/progress/battle-flow";
import * as ContinuesGameData from "./battle-flow__continue-game.data";
import * as DeathData from "./battle-flow__death.data";
import * as DrawData from "./battle-flow__draw.data";

test("戦闘したが、相手を倒しきれなかったのでゲーム続行", () => {
  const { lastState, commands } = ContinuesGameData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("continue-game");
});

test("攻撃で防御側のHPを0以下にした場合、ゲームが終了する", () => {
  const { lastState, commands } = DeathData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("death");
});

test("ダメージ反射でHPが0になった場合は引き分け", () => {
  const { lastState, commands } = DrawData;
  const result = battleFlow(lastState, commands);
  expect(result).toMatchSnapshot("draw");
});
