import { reflectFlow } from "../../../../src/game/progress/battle-flow/reflect-flow";
import * as MultiReflectData from "./reflect-flow__multi-reflect.data";
import * as SingleReflectData from "./reflect-flow__single-reflect.data";

test("ダメージ反射が正しく適用される", () => {
  const { lastState } = SingleReflectData;
  const result = reflectFlow(lastState, "attacker");
  expect(result).toMatchSnapshot("single-reflect");
});

test("ダメージ反射の重ね掛けも正しく処理される", () => {
  const { lastState } = MultiReflectData;
  const result = reflectFlow(lastState, "attacker");
  expect(result).toMatchSnapshot("multi-reflect");
});
