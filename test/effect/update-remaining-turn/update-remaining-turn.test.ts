import { updateRemainingTurn } from "../../../src/effect/update-remaining-turn";
import { lastState } from "./update-remaining-turn.data";

test("効果継続ターン更新が正しく処理される", () => {
  const result = updateRemainingTurn(lastState);
  expect(result).toMatchSnapshot();
});
